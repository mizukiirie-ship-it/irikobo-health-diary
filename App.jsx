import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const HEADER_IMG = 'data:image/jpeg;base64,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';

const CorgiIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 14 L5 4 L14 11 Z" fill="#C8964A" />
    <path d="M31 14 L35 4 L26 11 Z" fill="#C8964A" />
    <path d="M9.5 13 L7 7 L12.5 11.5 Z" fill="#F5C896" />
    <path d="M30.5 13 L33 7 L27.5 11.5 Z" fill="#F5C896" />
    <ellipse cx="20" cy="23" rx="11" ry="10" fill="#E8B981" />
    <ellipse cx="20" cy="27" rx="6.5" ry="5" fill="#FFF8E7" />
    <path d="M20 14 L17 22 L20 24 L23 22 Z" fill="#FFF8E7" />
    <ellipse cx="14.5" cy="20" rx="1.4" ry="1.6" fill="#3D2817" />
    <ellipse cx="25.5" cy="20" rx="1.4" ry="1.6" fill="#3D2817" />
    <circle cx="15" cy="19.5" r="0.4" fill="#FFF" />
    <circle cx="26" cy="19.5" r="0.4" fill="#FFF" />
    <ellipse cx="20" cy="25" rx="1.6" ry="1.2" fill="#3D2817" />
    <path d="M20 26.5 L20 28.5 M16.5 29.5 Q20 32 23.5 29.5" stroke="#3D2817" strokeWidth="0.9" fill="none" strokeLinecap="round" />
    <path d="M19 30.5 Q20 31.5 21 30.5" fill="#F4A6A6" />
  </svg>
);

const CorgiPaw = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20">
    <ellipse cx="10" cy="13" rx="5" ry="4" fill="#C8964A" />
    <circle cx="6" cy="7" r="2" fill="#C8964A" />
    <circle cx="10" cy="5" r="2" fill="#C8964A" />
    <circle cx="14" cy="7" r="2" fill="#C8964A" />
  </svg>
);

export default function HealthApp() {
  const [data, setData] = useState({ records: [], comments: [] });
  const [todayKey, setTodayKey] = useState(getJapanDateKey());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const checkDate = () => {
      const newKey = getJapanDateKey();
      setTodayKey(prev => prev !== newKey ? newKey : prev);
    };
    const interval = setInterval(checkDate, 5000);
    const onVisibility = () => { if (!document.hidden) checkDate(); };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('focus', checkDate);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('focus', checkDate);
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data: rows } = await supabase.from('records').select('*');
        const { data: commentRows } = await supabase.from('comments').select('*').order('created_at', { ascending: false });
        const records = rows ? rows.map(r => JSON.parse(r.data)) : [];
        const comments = commentRows ? commentRows.map(c => ({ id: c.id, text: c.text, timestamp: c.timestamp })) : [];
        setData({ records, comments });
      } catch (e) {
        console.log('初回起動');
      }
      setLoaded(true);
    })();
  }, []);

  const sendLineNotify = async (type, content) => {
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, content }),
      });
    } catch (e) {
      console.error('LINE通知失敗', e);
    }
  };

  const saveData = async (newData, notifyType, notifyContent) => {
    setData(newData);
    if (notifyType && notifyContent) {
      sendLineNotify(notifyType, notifyContent);
    }
    try {
      for (const record of newData.records) {
        const { data: existing } = await supabase
          .from('records').select('id').eq('date', record.date).single();
        if (existing) {
          await supabase.from('records')
            .update({ data: JSON.stringify(record) }).eq('date', record.date);
        } else {
          await supabase.from('records')
            .insert({ date: record.date, data: JSON.stringify(record) });
        }
      }
    } catch (e) {
      console.error('保存失敗', e);
    }
  };

  const isDaughter = new URLSearchParams(window.location.search).get('mode') === 'daughter';



  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FAF3E3 0%, #F5E8D0 100%)',
      fontFamily: '"Hiragino Maru Gothic ProN", "Yu Gothic", sans-serif',
      paddingBottom: '40px',
    }}>
      <header style={{
        background: `linear-gradient(180deg, rgba(212, 165, 116, 0.85) 0%, rgba(200, 150, 74, 0.92) 100%), url(${HEADER_IMG})`,
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
        padding: '16px 20px', boxShadow: '0 4px 12px rgba(139, 90, 43, 0.15)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <CorgiIcon size={48} />
          <h1 style={{ margin: 0, fontSize: '20px', color: '#FFF8E7', fontWeight: 700, letterSpacing: '0.5px', textShadow: '0 1px 3px rgba(93, 60, 30, 0.4)' }}>いりこぼ健康日記</h1>
        </div>
      </header>
      <main style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
        {!loaded ? (
          <div style={{ textAlign: 'center', color: '#8B5A2B', padding: '40px' }}>読み込み中...</div>
      ) : isDaughter ? (
          <DaughterView data={data} saveData={saveData} todayKey={todayKey} />
        ) : (
          <FatherView data={data} saveData={saveData} todayKey={todayKey} />
        )}
      </main>
    </div>
  );
}

function FatherView({ data, saveData, todayKey }) {
  const [activeTab, setActiveTab] = useState('record');
  const [exerciseCategory, setExerciseCategory] = useState('ウォーキング');
  const [exerciseInput, setExerciseInput] = useState('');
  const [stepsInput, setStepsInput] = useState('');
  const [startTimeInput, setStartTimeInput] = useState('');
  const [durationInput, setDurationInput] = useState('');
  const [exerciseDate, setExerciseDate] = useState(todayKey);
  const [moodInput, setMoodInput] = useState('');
  const [moodDate, setMoodDate] = useState(todayKey);
  const [mealCategory, setMealCategory] = useState('朝食');
  const [foodNameInput, setFoodNameInput] = useState('');
  const [caloriesInput, setCaloriesInput] = useState('');
  const [mealDate, setMealDate] = useState(todayKey);
  const [pendingPhoto, setPendingPhoto] = useState(null);
  const [period, setPeriod] = useState('7days');
  const fileInputRef = useRef(null);

  const todayRecord = data.records.find(r => r.date === todayKey) || { date: todayKey, exercises: [], meals: [], mood: '' };

  function getRecordForDate(d) { return data.records.find(r => r.date === d) || { date: d, exercises: [], meals: [], mood: '' }; }
  function updateRecordForDate(d, newRecord) { return { ...data, records: [...data.records.filter(r => r.date !== d), newRecord] }; }
  function updateTodayRecord(newRecord) { return updateRecordForDate(todayKey, newRecord); }

  const addExercise = async () => {
    if (exerciseCategory === 'その他' && !exerciseInput.trim() && !stepsInput.trim()) return;
    const baseText = exerciseCategory === 'その他' ? (exerciseInput || `運動 ${stepsInput}歩`) : exerciseCategory;
    const newEx = { id: Date.now(), category: exerciseCategory, text: baseText, steps: stepsInput ? parseInt(stepsInput) : null, startTime: startTimeInput || null, duration: durationInput ? parseInt(durationInput) : null, time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }) };
    const target = getRecordForDate(exerciseDate);
await saveData(
  updateRecordForDate(exerciseDate, { ...target, exercises: [...target.exercises, newEx] }),
  'exercise',
  `${newEx.category}${newEx.duration ? ` ${newEx.duration}分` : ''}${newEx.steps ? ` ${newEx.steps}歩` : ''}`
);
    setExerciseInput(''); setStepsInput(''); setStartTimeInput(''); setDurationInput('');
    setExerciseCategory('ウォーキング'); setExerciseDate(todayKey);
  };
  const deleteExercise = async (id) => { await saveData(updateTodayRecord({ ...todayRecord, exercises: todayRecord.exercises.filter(e => e.id !== id) })); };
  const saveMood = async () => {
    if (!moodInput.trim()) return;
    const target = getRecordForDate(moodDate);
    await saveData(
  updateRecordForDate(moodDate, { ...target, mood: moodInput }),
  'mood',
  moodInput
);
    setMoodInput(''); setMoodDate(todayKey);
  };
  const handlePhotoSelect = async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    try { const compressed = await compressImage(file); setPendingPhoto(compressed); } catch { alert('写真の読み込みに失敗しました'); }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  const addMeal = async () => {
    if (!pendingPhoto && !foodNameInput.trim()) return;
    const newMeal = { id: Date.now(), photo: pendingPhoto, category: mealCategory, foodName: foodNameInput || mealCategory, calories: caloriesInput ? parseInt(caloriesInput) : null, time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }) };
    const target = getRecordForDate(mealDate);
    await saveData(
  updateRecordForDate(mealDate, { ...target, meals: [...target.meals, newMeal] }),
  'meal',
  `${newMeal.category}：${newMeal.foodName}${newMeal.calories ? ` ${newMeal.calories}kcal` : ''}`
);
    setPendingPhoto(null); setFoodNameInput(''); setCaloriesInput(''); setMealCategory('朝食'); setMealDate(todayKey);
  };
  const deleteMeal = async (id) => { await saveData(updateTodayRecord({ ...todayRecord, meals: todayRecord.meals.filter(m => m.id !== id) })); };

  const totalSteps = todayRecord.exercises.reduce((s, e) => s + (e.steps || 0), 0);
  const totalDuration = todayRecord.exercises.reduce((s, e) => s + (e.duration || 0), 0);
  const recentComments = data.comments.slice(-3).reverse();
  const periodData = buildPeriodData(data.records, period, todayKey);
  const maxSteps = Math.max(...periodData.map(d => d.steps), 1000);
  const maxDuration = Math.max(...periodData.map(d => d.duration), 30);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', background: '#FFFFFF', borderRadius: '14px', padding: '4px', gap: '4px', boxShadow: '0 2px 8px rgba(139, 90, 43, 0.08)', border: '1px solid #F0E2C9', position: 'sticky', top: '0', zIndex: 5 }}>
        <button onClick={() => setActiveTab('record')} style={tabBtnStyle(activeTab === 'record')}>✏️ 記録する</button>
        <button onClick={() => setActiveTab('view')} style={tabBtnStyle(activeTab === 'view')}>📖 記録を見る</button>
      </div>

      {activeTab === 'view' && <>
        <Card>
          <SectionTitle icon="📅">{formatDate(todayKey)}</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '12px' }}>
            <Stat label="歩数" value={totalSteps || '-'} unit="歩" small />
            <Stat label="運動" value={totalDuration || '-'} unit="分" small />
            <Stat label="食事" value={todayRecord.meals.length} unit="食" small />
          </div>
        </Card>
        {recentComments.length > 0 && <Card accent>
          <SectionTitle icon="💌">娘からのメッセージ</SectionTitle>
          {recentComments.map(c => <div key={c.id} style={{ background: '#FFF8E7', padding: '12px', borderRadius: '12px', marginTop: '8px', borderLeft: '4px solid #D4A574' }}>
            <p style={{ margin: 0, fontSize: '15px', color: '#3D2817', lineHeight: 1.5 }}>{c.text}</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#8B5A2B' }}>{c.timestamp}</p>
          </div>)}
        </Card>}
        <Card>
          <SectionTitle icon="📈">{periodTitle(period)}の歩数</SectionTitle>
          <PeriodTabs value={period} onChange={setPeriod} />
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: period === '30days' ? '2px' : '4px', marginTop: '16px', height: '120px' }}>
            {periodData.map(d => <div key={d.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ fontSize: '9px', color: '#8B5A2B', minHeight: '12px' }}>{period !== '30days' && d.steps > 0 ? formatStepsCompact(d.steps) : ''}</div>
              <div style={{ width: '100%', height: `${(d.steps / maxSteps) * 80}px`, background: d.steps > 0 ? 'linear-gradient(180deg, #D4A574 0%, #C8964A 100%)' : '#F0E2C9', borderRadius: '4px 4px 0 0', minHeight: '4px' }} />
              <div style={{ fontSize: '9px', color: '#5C4033', minHeight: '11px' }}>{d.label}</div>
            </div>)}
          </div>
        </Card>
        <Card>
          <SectionTitle icon="⏱">{periodTitle(period)}の運動時間</SectionTitle>
          <PeriodTabs value={period} onChange={setPeriod} />
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: period === '30days' ? '2px' : '4px', marginTop: '16px', height: '120px' }}>
            {periodData.map(d => <div key={d.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ fontSize: '9px', color: '#8B5A2B', minHeight: '12px' }}>{period !== '30days' && d.duration > 0 ? `${d.duration}分` : ''}</div>
              <div style={{ width: '100%', height: `${(d.duration / maxDuration) * 80}px`, background: d.duration > 0 ? 'linear-gradient(180deg, #E8B981 0%, #D4A574 100%)' : '#F0E2C9', borderRadius: '4px 4px 0 0', minHeight: '4px' }} />
              <div style={{ fontSize: '9px', color: '#5C4033', minHeight: '11px' }}>{d.label}</div>
            </div>)}
          </div>
        </Card>
        <PastRecordsCard records={data.records} todayKey={todayKey}
          onDeleteExercise={async (date, id) => { const r = getRecordForDate(date); await saveData(updateRecordForDate(date, { ...r, exercises: r.exercises.filter(e => e.id !== id) })); }}
          onDeleteMeal={async (date, id) => { const r = getRecordForDate(date); await saveData(updateRecordForDate(date, { ...r, meals: r.meals.filter(m => m.id !== id) })); }}
          onDeleteMood={async (date) => { const r = getRecordForDate(date); await saveData(updateRecordForDate(date, { ...r, mood: '' })); }}
        />
      </>}

      {activeTab === 'record' && <>
        <Card>
          <SectionTitle icon="📅">{formatDate(todayKey)}</SectionTitle>
          <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#5C4033', lineHeight: 1.5 }}>今日の記録をつけましょう🐕</p>
        </Card>
        <Card>
          <SectionTitle icon="🚶">運動の記録</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            <DatePickerRow label="日付" value={exerciseDate} onChange={setExerciseDate} todayKey={todayKey} />
            <div>
              <label style={labelStyle}>種類</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
                {['ウォーキング', 'エアロバイク', 'ストレッチ', 'その他'].map(cat => <button key={cat} onClick={() => setExerciseCategory(cat)} style={{ padding: '10px 6px', fontSize: '13px', fontWeight: exerciseCategory === cat ? 700 : 500, color: exerciseCategory === cat ? '#FFF8E7' : '#8B5A2B', background: exerciseCategory === cat ? 'linear-gradient(135deg, #D4A574 0%, #C8964A 100%)' : '#FAF3E3', border: exerciseCategory === cat ? 'none' : '1px solid #F0E2C9', borderRadius: '8px', cursor: 'pointer' }}>{cat}</button>)}
              </div>
            </div>
            {exerciseCategory === 'その他' && <input type="text" placeholder="運動の内容（例：ラジオ体操）" value={exerciseInput} onChange={e => setExerciseInput(e.target.value)} style={inputStyle} />}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div><label style={labelStyle}>始めた時間</label><input type="time" value={startTimeInput} onChange={e => setStartTimeInput(e.target.value)} style={inputStyle} /></div>
              <div><label style={labelStyle}>何分間</label><input type="number" placeholder="30" value={durationInput} onChange={e => setDurationInput(e.target.value)} style={inputStyle} /></div>
            </div>
            <input type="number" placeholder="歩数（任意）" value={stepsInput} onChange={e => setStepsInput(e.target.value)} style={inputStyle} />
            <button onClick={addExercise} style={primaryButtonStyle}><CorgiPaw size={16} /> 記録する</button>
          </div>
          {todayRecord.exercises.map(ex => <div key={ex.id} style={listItemStyle}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                {ex.category && <span style={exerciseBadgeStyle(ex.category)}>{ex.category}</span>}
                {ex.category === 'その他' && ex.text !== ex.category && <span style={{ fontSize: '14px' }}>{ex.text}</span>}
              </div>
              {(ex.startTime || ex.duration || ex.steps) && <span style={{ fontSize: '12px', color: '#8B5A2B' }}>{ex.startTime && `${ex.startTime}〜`}{ex.duration && `${ex.duration}分`}{ex.steps && ` ・${ex.steps}歩`}</span>}
            </div>
            <button onClick={() => deleteExercise(ex.id)} style={deleteBtnStyle}>×</button>
          </div>)}
        </Card>
        <Card>
          <SectionTitle icon="🍱">食事の記録</SectionTitle>
          <div style={{ marginTop: '12px' }}><DatePickerRow label="日付" value={mealDate} onChange={setMealDate} todayKey={todayKey} /></div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoSelect} style={{ display: 'none' }} />
          {pendingPhoto && <div style={{ marginTop: '12px', position: 'relative' }}>
            <img src={pendingPhoto} alt="プレビュー" style={{ width: '100%', borderRadius: '12px', maxHeight: '200px', objectFit: 'cover' }} />
            <button onClick={() => setPendingPhoto(null)} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: '#FFF', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', fontSize: '14px' }}>×</button>
          </div>}
          <button onClick={() => fileInputRef.current?.click()} style={{ ...secondaryButtonStyle, marginTop: '12px' }}>📷 {pendingPhoto ? '写真を選び直す' : '食事の写真を選ぶ'}</button>
          <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
              <label style={labelStyle}>種類</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
                {['朝食', '昼食', '夕食', '間食', 'お酒'].map(cat => <button key={cat} onClick={() => setMealCategory(cat)} style={{ padding: '8px 4px', fontSize: '12px', fontWeight: mealCategory === cat ? 700 : 500, color: mealCategory === cat ? '#FFF8E7' : '#8B5A2B', background: mealCategory === cat ? 'linear-gradient(135deg, #D4A574 0%, #C8964A 100%)' : '#FAF3E3', border: mealCategory === cat ? 'none' : '1px solid #F0E2C9', borderRadius: '8px', cursor: 'pointer' }}>{cat}</button>)}
              </div>
            </div>
            <input type="text" placeholder="メニュー（例：おにぎり、味噌汁）" value={foodNameInput} onChange={e => setFoodNameInput(e.target.value)} style={inputStyle} />
            <input type="number" placeholder="カロリー（任意・kcal）" value={caloriesInput} onChange={e => setCaloriesInput(e.target.value)} style={inputStyle} />
            <button onClick={addMeal} style={primaryButtonStyle}><CorgiPaw size={16} /> 食事を記録</button>
          </div>
          {todayRecord.meals.map(meal => <div key={meal.id} style={{ background: '#FFF8E7', borderRadius: '12px', padding: '12px', marginTop: '12px', position: 'relative' }}>
            <button onClick={() => deleteMeal(meal.id)} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.5)', color: '#FFF', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', fontSize: '12px', zIndex: 1 }}>×</button>
            {meal.photo && <img src={meal.photo} alt={meal.foodName} style={{ width: '100%', borderRadius: '8px', maxHeight: '180px', objectFit: 'cover' }} />}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
              {meal.category && <span style={categoryBadgeStyle(meal.category)}>{meal.category}</span>}
              <h4 style={{ margin: 0, color: '#3D2817', fontSize: '15px', flex: 1 }}>{meal.foodName}</h4>
              <span style={{ fontSize: '12px', color: '#8B5A2B' }}>{meal.time}</span>
            </div>
            {meal.calories && <div style={{ marginTop: '6px', display: 'inline-block', background: '#FAF3E3', padding: '4px 10px', borderRadius: '8px', fontSize: '13px', color: '#5C4033' }}>{meal.calories} kcal</div>}
          </div>)}
        </Card>
        <Card>
          <SectionTitle icon="💭">ひとことメモ</SectionTitle>
          <div style={{ marginTop: '12px' }}><DatePickerRow label="日付" value={moodDate} onChange={setMoodDate} todayKey={todayKey} /></div>
          {todayRecord.mood && <div style={{ background: '#FFF8E7', padding: '12px', borderRadius: '10px', marginTop: '12px', color: '#3D2817', fontSize: '14px', borderLeft: '3px solid #D4A574' }}>{todayRecord.mood}</div>}
          <textarea placeholder="気分や出来事を一言" value={moodInput} onChange={e => setMoodInput(e.target.value)} rows={3} style={{ ...inputStyle, marginTop: '12px', resize: 'vertical' }} />
          <button onClick={saveMood} style={{ ...primaryButtonStyle, marginTop: '8px' }}>記録する</button>
        </Card>
      </>}
    </div>
  );
}

async function compressImage(file, maxSize = 1024, quality = 0.85) {
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('読み込み失敗'));
    reader.readAsDataURL(file);
  });
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        let { width, height } = img;
        if (width > maxSize || height > maxSize) {
          if (width > height) { height = Math.round(height * (maxSize / width)); width = maxSize; }
          else { width = Math.round(width * (maxSize / height)); height = maxSize; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      } catch { resolve(dataUrl); }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  return `${d.getMonth() + 1}月${d.getDate()}日(${days[d.getDay()]})`;
}

function getJapanDateKey(date) {
  const d = date || new Date();
  const jstStr = d.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' });
  return jstStr.replace(/\//g, '-').replace(/(\d+)-(\d+)-(\d+).*/, '$1-$2-$3');
}

function shiftDateKey(dateKey, daysOffset) {
  const [y, m, d] = dateKey.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  date.setUTCDate(date.getUTCDate() + daysOffset);
  const yy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  return `${yy}-${mm}-${dd}`;
}

function buildPeriodData(records, period, todayKey) {
  const baseKey = todayKey || getJapanDateKey(new Date());
  if (period === '7days') {
    const arr = [];
    for (let i = 6; i >= 0; i--) {
      const key = shiftDateKey(baseKey, -i);
      const [, m, d] = key.split('-').map(Number);
      const r = records.find(x => x.date === key);
      arr.push({ key, label: `${m}/${d}`, steps: r ? r.exercises.reduce((s, e) => s + (e.steps || 0), 0) : 0, duration: r ? r.exercises.reduce((s, e) => s + (e.duration || 0), 0) : 0 });
    }
    return arr;
  }
  if (period === '30days') {
    const arr = [];
    for (let i = 29; i >= 0; i--) {
      const key = shiftDateKey(baseKey, -i);
      const [, m, d] = key.split('-').map(Number);
      const r = records.find(x => x.date === key);
      arr.push({ key, label: i % 5 === 0 ? `${m}/${d}` : '', steps: r ? r.exercises.reduce((s, e) => s + (e.steps || 0), 0) : 0, duration: r ? r.exercises.reduce((s, e) => s + (e.duration || 0), 0) : 0 });
    }
    return arr;
  }
  if (period === '3months') {
    const arr = [];
    for (let w = 11; w >= 0; w--) {
      const endKey = shiftDateKey(baseKey, -w * 7);
      const startKey = shiftDateKey(endKey, -6);
      let steps = 0, duration = 0;
      for (let i = 0; i < 7; i++) {
        const key = shiftDateKey(startKey, i);
        const r = records.find(x => x.date === key);
        if (r) { steps += r.exercises.reduce((s, e) => s + (e.steps || 0), 0); duration += r.exercises.reduce((s, e) => s + (e.duration || 0), 0); }
      }
      const [, sm, sd] = startKey.split('-').map(Number);
      arr.push({ key: startKey, label: w % 3 === 0 ? `${sm}/${sd}` : '', steps, duration });
    }
    return arr;
  }
  if (period === '1year') {
    const arr = [];
    const [ty, tm] = baseKey.split('-').map(Number);
    for (let mo = 11; mo >= 0; mo--) {
      let targetYear = ty, targetMonth = tm - mo;
      while (targetMonth <= 0) { targetMonth += 12; targetYear -= 1; }
      const ym = `${targetYear}-${String(targetMonth).padStart(2, '0')}`;
      const monthRecords = records.filter(r => r.date.startsWith(ym));
      let steps = 0, duration = 0;
      monthRecords.forEach(r => { steps += r.exercises.reduce((s, e) => s + (e.steps || 0), 0); duration += r.exercises.reduce((s, e) => s + (e.duration || 0), 0); });
      arr.push({ key: ym, label: `${targetMonth}月`, steps, duration });
    }
    return arr;
  }
  return [];
}

function periodTitle(p) { return { '7days': '7日間', '30days': '30日間', '3months': '3ヶ月', '1year': '1年間' }[p] || ''; }
function formatStepsCompact(n) { if (n >= 10000) return (n / 10000).toFixed(1) + '万'; if (n >= 1000) return (n / 1000).toFixed(1) + 'k'; return String(n); }

function PastRecordsCard({ records, comments, todayKey, onDeleteExercise, onDeleteMeal, onDeleteMood }) {
  const [expandedDate, setExpandedDate] = useState(null);
  const [expandedMonth, setExpandedMonth] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const recentDates = [];
  for (let i = 0; i <= 14; i++) recentDates.push(shiftDateKey(todayKey, -i));
  const recentDateSet = new Set(recentDates);
  const olderRecordsByMonth = {};
  records.filter(r => !recentDateSet.has(r.date)).forEach(r => {
    const ym = r.date.slice(0, 7);
    if (!olderRecordsByMonth[ym]) olderRecordsByMonth[ym] = [];
    olderRecordsByMonth[ym].push(r);
  });
  const olderMonths = Object.keys(olderRecordsByMonth).sort().reverse();

  function DayDetail({ dateKey, r, dayComments }) {
    return <div style={{ padding: '0 4px 12px 4px' }}>
      {dayComments && dayComments.length > 0 && <div style={{ marginBottom: '10px' }}>
        <strong style={{ fontSize: '12px', color: '#8B5A2B' }}>💌 娘からのコメント</strong>
        {dayComments.map(c => <div key={c.id} style={{ background: '#FFF8E7', padding: '8px 12px', borderRadius: '8px', marginTop: '6px', borderLeft: '3px solid #D4A574' }}>
          <p style={{ margin: 0, fontSize: '13px', color: '#3D2817' }}>{c.text}</p>
          <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#8B5A2B' }}>{c.timestamp}</p>
        </div>)}
      </div>}
      {r.exercises.length > 0 && <div style={{ marginBottom: '10px' }}>
        <strong style={{ fontSize: '12px', color: '#8B5A2B' }}>🚶 運動</strong>
        {r.exercises.map(ex => <div key={ex.id} style={{ background: '#FAF3E3', padding: '8px 12px', borderRadius: '8px', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {ex.category && <span style={exerciseBadgeStyle(ex.category)}>{ex.category}</span>}
              {ex.category === 'その他' && ex.text !== ex.category && <span style={{ fontSize: '13px' }}>{ex.text}</span>}
            </div>
            {(ex.startTime || ex.duration || ex.steps) && <span style={{ fontSize: '11px', color: '#8B5A2B' }}>{ex.startTime && `${ex.startTime}〜`}{ex.duration && `${ex.duration}分`}{ex.steps && ` ・${ex.steps}歩`}</span>}
          </div>
          <button onClick={() => onDeleteExercise(dateKey, ex.id)} style={deleteBtnStyle}>×</button>
        </div>)}
      </div>}
      {r.meals.length > 0 && <div style={{ marginBottom: '10px' }}>
        <strong style={{ fontSize: '12px', color: '#8B5A2B' }}>🍱 食事</strong>
        {r.meals.map(meal => <div key={meal.id} style={{ background: '#FAF3E3', borderRadius: '8px', padding: '8px', marginTop: '6px', position: 'relative' }}>
          <button onClick={() => onDeleteMeal(dateKey, meal.id)} style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(0,0,0,0.4)', color: '#FFF', border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', fontSize: '12px', padding: 0, zIndex: 1 }}>×</button>
          {meal.photo && <img src={meal.photo} alt={meal.foodName} onClick={() => setSelectedPhoto(meal)} style={{ width: '100%', borderRadius: '6px', maxHeight: '160px', objectFit: 'cover', cursor: 'pointer', marginBottom: '6px' }} />}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', paddingRight: '24px' }}>
            {meal.category && <span style={categoryBadgeStyle(meal.category)}>{meal.category}</span>}
            <span style={{ fontSize: '13px', color: '#3D2817', flex: 1 }}>{meal.foodName}</span>
            {meal.calories && <span style={{ fontSize: '12px', color: '#8B5A2B' }}>{meal.calories}kcal</span>}
          </div>
        </div>)}
      </div>}
      {r.mood && <div>
        <strong style={{ fontSize: '12px', color: '#8B5A2B' }}>💭 ひとことメモ</strong>
        <div style={{ background: '#FFF8E7', padding: '10px 12px', borderRadius: '8px', marginTop: '6px', borderLeft: '3px solid #D4A574', display: 'flex', gap: '8px' }}>
          <p style={{ margin: 0, fontSize: '13px', color: '#3D2817', flex: 1, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{r.mood}</p>
          <button onClick={() => onDeleteMood(dateKey)} style={deleteBtnStyle}>×</button>
        </div>
      </div>}
    </div>;
  }

  function DayRow({ dateKey, badge }) {
    const r = records.find(x => x.date === dateKey);
    const hasData = r && (r.exercises.length > 0 || r.meals.length > 0 || r.mood);
    const isExpanded = expandedDate === dateKey;
    return <div style={{ borderBottom: '1px solid #F0E2C9' }}>
      <button onClick={() => setExpandedDate(isExpanded ? null : dateKey)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 4px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <strong style={{ fontSize: '14px', color: '#3D2817' }}>{formatDate(dateKey)}</strong>{badge}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {hasData ? <span style={{ fontSize: '11px', color: '#8B5A2B' }}>{r.exercises.length > 0 && `🚶${r.exercises.length} `}{r.meals.length > 0 && `🍱${r.meals.length} `}{r.mood && '💭'}</span> : <span style={{ fontSize: '11px', color: '#A88660' }}>記録なし</span>}
          <span style={{ fontSize: '12px', color: '#8B5A2B' }}>{isExpanded ? '▲' : '▼'}</span>
        </div>
      </button>
     {isExpanded && hasData && <DayDetail dateKey={dateKey} r={r} dayComments={records.filter ? undefined : undefined} />}
    </div>;
  }

  return <>
    <Card>
      <SectionTitle icon="📔">これまでの記録</SectionTitle>
      <p style={{ margin: '6px 0 12px 0', fontSize: '11px', color: '#8B5A2B' }}>日付や月をタップで詳細表示・削除ができます</p>
      <div style={{ marginBottom: olderMonths.length > 0 ? '16px' : 0 }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#8B5A2B', fontWeight: 700 }}>🐾 直近2週間</h4>
        {recentDates.map(dateKey => <DayRow key={dateKey} dateKey={dateKey} badge={dateKey === todayKey ? <span style={{ fontSize: '10px', color: '#FFF8E7', background: '#C8964A', padding: '2px 6px', borderRadius: '6px', fontWeight: 700 }}>今日</span> : null} />)}
      </div>
      {olderMonths.length > 0 && <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#8B5A2B', fontWeight: 700 }}>📚 月別アーカイブ</h4>
        {olderMonths.map(ym => {
          const monthRecords = olderRecordsByMonth[ym].sort((a, b) => b.date.localeCompare(a.date));
          const isMonthExpanded = expandedMonth === ym;
          const [y, m] = ym.split('-');
          return <div key={ym} style={{ borderBottom: '1px solid #F0E2C9', marginBottom: '4px' }}>
            <button onClick={() => setExpandedMonth(isMonthExpanded ? null : ym)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 4px', background: isMonthExpanded ? '#FFF8E7' : 'none', border: 'none', cursor: 'pointer', textAlign: 'left', borderRadius: '8px' }}>
              <strong style={{ fontSize: '15px', color: '#3D2817' }}>{parseInt(y)}年{parseInt(m)}月</strong>
              <span style={{ fontSize: '12px', color: '#8B5A2B' }}>{isMonthExpanded ? '▲' : '▼'}</span>
            </button>
            {isMonthExpanded && <div style={{ paddingLeft: '12px', borderLeft: '2px solid #D4A574', marginLeft: '4px' }}>
              {monthRecords.map(r => <DayRow key={r.date} dateKey={r.date} badge={null} />)}
            </div>}
          </div>;
        })}
      </div>}
    </Card>
    {selectedPhoto && <div onClick={() => setSelectedPhoto(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '90%', maxHeight: '90%', textAlign: 'center' }}>
        <img src={selectedPhoto.photo} alt={selectedPhoto.foodName} style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '12px' }} />
        <div style={{ color: '#FFF', marginTop: '12px' }}><strong>{selectedPhoto.foodName}</strong>{selectedPhoto.calories && <span> ・ {selectedPhoto.calories}kcal</span>}</div>
      </div>
    </div>}
  </>;
}

function DatePickerRow({ label, value, onChange, todayKey }) {
  const yesterdayKey = shiftDateKey(todayKey, -1);
  const isToday = value === todayKey, isYesterday = value === yesterdayKey, isOther = !isToday && !isYesterday;
  const btnS = (active) => ({ padding: '8px 12px', fontSize: '12px', fontWeight: active ? 700 : 500, color: active ? '#FFF8E7' : '#8B5A2B', background: active ? 'linear-gradient(135deg, #D4A574 0%, #C8964A 100%)' : '#FAF3E3', border: active ? 'none' : '1px solid #F0E2C9', borderRadius: '8px', cursor: 'pointer', whiteSpace: 'nowrap' });
  return <div>
    <label style={labelStyle}>{label}</label>
    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
      <button onClick={() => onChange(todayKey)} style={btnS(isToday)}>今日</button>
      <button onClick={() => onChange(yesterdayKey)} style={btnS(isYesterday)}>昨日</button>
      <input type="date" value={value} max={todayKey} onChange={e => onChange(e.target.value)} style={{ ...inputStyle, padding: '8px 10px', fontSize: '13px', flex: 1, minWidth: '130px' }} />
    </div>
    {isOther && <p style={{ margin: '6px 0 0 0', fontSize: '11px', color: '#C8964A', fontWeight: 600 }}>📌 {formatDate(value)}の記録として保存されます</p>}
  </div>;
}

function PeriodTabs({ value, onChange }) {
  const tabs = [{ key: '7days', label: '7日' }, { key: '30days', label: '30日' }, { key: '3months', label: '3ヶ月' }, { key: '1year', label: '1年' }];
  return <div style={{ display: 'flex', background: '#FAF3E3', borderRadius: '10px', padding: '3px', gap: '3px', marginTop: '12px' }}>
    {tabs.map(t => <button key={t.key} onClick={() => onChange(t.key)} style={{ flex: 1, padding: '6px', fontSize: '12px', fontWeight: value === t.key ? 700 : 500, color: value === t.key ? '#FFF8E7' : '#8B5A2B', background: value === t.key ? 'linear-gradient(135deg, #D4A574 0%, #C8964A 100%)' : 'transparent', border: 'none', borderRadius: '7px', cursor: 'pointer' }}>{t.label}</button>)}
  </div>;
}

function Card({ children, accent }) {
  return <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '18px', boxShadow: accent ? '0 4px 16px rgba(212, 165, 116, 0.25)' : '0 2px 8px rgba(139, 90, 43, 0.08)', border: accent ? '2px solid #D4A574' : '1px solid #F0E2C9' }}>{children}</div>;
}
function SectionTitle({ icon, children }) {
  return <h3 style={{ margin: 0, fontSize: '15px', color: '#5C4033', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ fontSize: '18px' }}>{icon}</span>{children}</h3>;
}
function Stat({ label, value, unit, small }) {
  return <div style={{ background: '#FAF3E3', borderRadius: '12px', padding: small ? '10px' : '14px', textAlign: 'center' }}><div style={{ fontSize: '11px', color: '#8B5A2B', marginBottom: '4px' }}>{label}</div><div style={{ fontSize: small ? '18px' : '24px', fontWeight: 700, color: '#3D2817' }}>{value}{unit && <span style={{ fontSize: '11px', color: '#8B5A2B', marginLeft: '2px' }}>{unit}</span>}</div></div>;
}

const inputStyle = { width: '100%', padding: '12px', fontSize: '15px', border: '2px solid #F0E2C9', borderRadius: '12px', background: '#FFF8E7', color: '#3D2817', fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '12px', color: '#8B5A2B', fontWeight: 600, marginBottom: '4px', marginLeft: '4px' };
const primaryButtonStyle = { width: '100%', padding: '14px', fontSize: '15px', fontWeight: 700, color: '#FFF8E7', background: 'linear-gradient(135deg, #D4A574 0%, #C8964A 100%)', border: 'none', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(200, 150, 74, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' };
const secondaryButtonStyle = { width: '100%', padding: '12px', fontSize: '14px', fontWeight: 600, color: '#8B5A2B', background: '#FAF3E3', border: '2px solid #D4A574', borderRadius: '12px', cursor: 'pointer' };
const listItemStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#FAF3E3', borderRadius: '10px', marginTop: '8px', color: '#3D2817', gap: '8px' };
const deleteBtnStyle = { background: 'rgba(139, 90, 43, 0.2)', color: '#5C4033', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', fontSize: '14px', padding: 0, flexShrink: 0 };
function tabBtnStyle(active) { return { flex: 1, padding: '12px 8px', fontSize: '14px', fontWeight: active ? 700 : 500, color: active ? '#FFF8E7' : '#8B5A2B', background: active ? 'linear-gradient(135deg, #D4A574 0%, #C8964A 100%)' : 'transparent', border: 'none', borderRadius: '10px', cursor: 'pointer' }; }
const categoryColors = { '朝食': { bg: '#FFE4B5', fg: '#8B5A2B' }, '昼食': { bg: '#FFD9A0', fg: '#8B5A2B' }, '夕食': { bg: '#E8B981', fg: '#FFF8E7' }, '間食': { bg: '#F4C7A1', fg: '#8B5A2B' }, 'お酒': { bg: '#C8964A', fg: '#FFF8E7' }, '食事': { bg: '#FAF3E3', fg: '#8B5A2B' } };
function categoryBadgeStyle(cat) { const c = categoryColors[cat] || categoryColors['食事']; return { display: 'inline-block', padding: '3px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: 700, background: c.bg, color: c.fg, whiteSpace: 'nowrap' }; }
const exerciseColors = { 'ウォーキング': { bg: '#D4E8C8', fg: '#3D5A2B' }, 'エアロバイク': { bg: '#C8DDE8', fg: '#2B4A5A' }, 'ストレッチ': { bg: '#E8D4D4', fg: '#5A3D3D' }, 'その他': { bg: '#FAF3E3', fg: '#8B5A2B' } };
function exerciseBadgeStyle(cat) { const c = exerciseColors[cat] || exerciseColors['その他']; return { display: 'inline-block', padding: '3px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: 700, background: c.bg, color: c.fg, whiteSpace: 'nowrap' }; }
function DaughterView({ data, saveData, todayKey }) {
  const [commentInput, setCommentInput] = useState('');
  const [sending, setSending] = useState(false);

  const sendComment = async () => {
    if (!commentInput.trim()) return;
    setSending(true);
    const newComment = {
      id: String(Date.now()),
      text: commentInput,
      timestamp: new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    };
    try {
    await supabase.from('comments').insert({
        id: newComment.id,
        text: newComment.text,
        timestamp: newComment.timestamp,
        date: todayKey,
      });
      await saveData({ ...data, comments: [newComment, ...data.comments] });
    } catch (e) {
      console.error('コメント送信失敗', e);
    }
    setCommentInput('');
    setSending(false);
  };

  const deleteComment = async (id) => {
    await supabase.from('comments').delete().eq('id', id);
    await saveData({ ...data, comments: data.comments.filter(c => c.id !== id) });
  };

  const todayRecord = data.records.find(r => r.date === todayKey) || { date: todayKey, exercises: [], meals: [], mood: '' };
  const totalSteps = todayRecord.exercises.reduce((s, e) => s + (e.steps || 0), 0);
  const totalDuration = todayRecord.exercises.reduce((s, e) => s + (e.duration || 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Card accent>
        <SectionTitle icon="👧">娘として見る</SectionTitle>
        <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#5C4033' }}>お父さんの記録を見てコメントを送れます</p>
      </Card>

      <Card>
        <SectionTitle icon="📅">今日の記録（{formatDate(todayKey)}）</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '12px' }}>
          <Stat label="歩数" value={totalSteps || '-'} unit="歩" small />
          <Stat label="運動" value={totalDuration || '-'} unit="分" small />
          <Stat label="食事" value={todayRecord.meals.length} unit="食" small />
        </div>
        {todayRecord.exercises.length > 0 && (
          <div style={{ marginTop: '12px' }}>
            {todayRecord.exercises.map(ex => (
              <div key={ex.id} style={{ background: '#FAF3E3', padding: '8px 12px', borderRadius: '8px', marginTop: '6px', fontSize: '13px', color: '#3D2817' }}>
                <span style={exerciseBadgeStyle(ex.category)}>{ex.category}</span>
                {(ex.duration || ex.steps) && <span style={{ marginLeft: '8px', color: '#8B5A2B' }}>{ex.duration && `${ex.duration}分`}{ex.steps && ` ・${ex.steps}歩`}</span>}
              </div>
            ))}
          </div>
        )}
        {todayRecord.meals.length > 0 && (
          <div style={{ marginTop: '12px' }}>
            {todayRecord.meals.map(meal => (
              <div key={meal.id} style={{ background: '#FAF3E3', padding: '8px 12px', borderRadius: '8px', marginTop: '6px', fontSize: '13px', color: '#3D2817', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={categoryBadgeStyle(meal.category)}>{meal.category}</span>
                <span>{meal.foodName}</span>
                {meal.calories && <span style={{ color: '#8B5A2B' }}>{meal.calories}kcal</span>}
              </div>
            ))}
          </div>
        )}
        {todayRecord.mood && (
          <div style={{ marginTop: '12px', background: '#FFF8E7', padding: '10px 12px', borderRadius: '8px', borderLeft: '3px solid #D4A574', fontSize: '13px', color: '#3D2817' }}>
            💭 {todayRecord.mood}
          </div>
        )}
      </Card>

      <Card>
        <SectionTitle icon="💌">コメントを送る</SectionTitle>
        <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['すごい！', 'よく歩いたね👏', '食事バランスいいね', '無理しないでね', 'いい感じ！'].map(t => (
              <button key={t} onClick={() => setCommentInput(prev => prev + t)} style={{ padding: '6px 12px', fontSize: '12px', color: '#8B5A2B', background: '#FAF3E3', border: '1px solid #F0E2C9', borderRadius: '20px', cursor: 'pointer' }}>{t}</button>
            ))}
          </div>
          <textarea placeholder="メッセージを入力..." value={commentInput} onChange={e => setCommentInput(e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          <button onClick={sendComment} disabled={sending} style={{ ...primaryButtonStyle, opacity: sending ? 0.7 : 1 }}>
            {sending ? '送信中...' : '💌 送る'}
          </button>
        </div>
      </Card>

      {data.comments.length > 0 && (
        <Card>
          <SectionTitle icon="📝">送ったコメント</SectionTitle>
          {data.comments.map(c => (
            <div key={c.id} style={{ background: '#FFF8E7', padding: '12px', borderRadius: '12px', marginTop: '8px', borderLeft: '4px solid #D4A574', display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#3D2817' }}>{c.text}</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#8B5A2B' }}>{c.timestamp}</p>
              </div>
              <button onClick={() => deleteComment(c.id)} style={deleteBtnStyle}>×</button>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
