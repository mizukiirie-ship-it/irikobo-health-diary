-- =====================================================================
-- いりこぼ健康日記: recordsテーブルの重複行の確認・統合・再発防止
-- Supabaseダッシュボード → SQL Editor で上から順に実行してください
-- =====================================================================

-- ---------------------------------------------------------------------
-- STEP 1: 診断（まずこれだけ実行して重複の有無を確認）
-- 同じ日付の行が2件以上あれば、それが表示不具合・メモ消失の証拠です
-- ---------------------------------------------------------------------
select date, count(*) as row_count, array_agg(id order by created_at) as ids
from records
group by date
having count(*) > 1
order by date;

-- 各行の中身のサイズも確認（写真が大きすぎないかの目安）
select id, date, created_at, length(data) as data_bytes
from records
order by date, created_at;

-- ---------------------------------------------------------------------
-- STEP 2: 重複行の統合（STEP 1 で重複が見つかった場合のみ実行）
-- 同一日付の行を1行にマージします:
--   exercises / meals … 全行の内容を結合（重複要素は除去）
--   mood             … いちばん新しい行の空でない値を採用
-- 最も古い行(min id)に統合し、残りを削除します
-- ※ data列に不正なJSONの行があるとエラーで止まります（何も変更されません）。
--    その場合はSTEP 1のid一覧から該当行を目視確認してください。
-- ---------------------------------------------------------------------
begin;

with parsed as (
  select id, date, created_at, data::jsonb as j
  from records
),
dup_dates as (
  select date from parsed group by date having count(*) > 1
),
merged as (
  select
    p.date,
    min(p.id) as keep_id,
    (
      select coalesce(jsonb_agg(distinct e), '[]'::jsonb)
      from parsed p2, jsonb_array_elements(coalesce(p2.j->'exercises', '[]'::jsonb)) e
      where p2.date = p.date
    ) as exercises,
    (
      select coalesce(jsonb_agg(distinct m), '[]'::jsonb)
      from parsed p3, jsonb_array_elements(coalesce(p3.j->'meals', '[]'::jsonb)) m
      where p3.date = p.date
    ) as meals,
    (
      select p4.j->>'mood'
      from parsed p4
      where p4.date = p.date and coalesce(p4.j->>'mood', '') <> ''
      order by p4.created_at desc
      limit 1
    ) as mood
  from parsed p
  where p.date in (select date from dup_dates)
  group by p.date
)
update records r
set data = jsonb_build_object(
  'date', m.date,
  'exercises', m.exercises,
  'meals', m.meals,
  'mood', coalesce(m.mood, '')
)::text
from merged m
where r.id = m.keep_id;

delete from records r
using (
  select date, min(id) as keep_id
  from records
  group by date
  having count(*) > 1
) d
where r.date = d.date and r.id <> d.keep_id;

commit;

-- ---------------------------------------------------------------------
-- STEP 3: 再発防止（重複が無くなってから実行）
-- 日付ごとに1行しか作れないようにするユニーク制約
-- ---------------------------------------------------------------------
alter table records add constraint records_date_unique unique (date);

-- 確認: 0行になればOK
select date, count(*) from records group by date having count(*) > 1;
