-- =====================================================================
-- records_light : 一覧・グラフ用の「写真抜き」読み取り専用ビュー
-- 目的: recordsのdata列に埋め込まれた食事写真(base64)は非常に重く、
--       起動時に全件取得するとアプリがフリーズする。写真を除いた軽量版を
--       このビューで提供し、アプリはこれを読む。写真は表示する日だけ
--       records本体から個別に遅延取得する。
-- 実行済み: 2026-09-22（Supabase SQL Editor）
-- 効果: 全記録の取得サイズ 約12.4MB → 約42KB
-- =====================================================================
create or replace view records_light as
select id, date, created_at,
  jsonb_build_object(
    'date', coalesce(data::jsonb->'date', to_jsonb(date)),
    'exercises', coalesce(data::jsonb->'exercises', '[]'::jsonb),
    'mood', coalesce(data::jsonb->'mood', '""'::jsonb),
    'meals', (
      select coalesce(jsonb_agg(
        (m - 'photo') || jsonb_build_object('hasPhoto', (m ? 'photo') and coalesce(m->>'photo','') <> '')
      ), '[]'::jsonb)
      from jsonb_array_elements(coalesce(data::jsonb->'meals','[]'::jsonb)) m
    )
  )::text as data
from records;

grant select on records_light to anon, authenticated;
