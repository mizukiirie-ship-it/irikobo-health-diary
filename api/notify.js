export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { type, content } = req.body;
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const userId = process.env.LINE_USER_ID;

  const typeLabel = {
    exercise: '🚶 運動',
    meal: '🍱 食事',
    mood: '💭 ひとことメモ',
  }[type] || '📝 記録';

  const message = `🐕 いりこぼ健康日記\n${typeLabel}が記録されました！\n\n${content}`;

  await fetch('https://api.line.me/v2/bot/message/broadcast', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      messages: [{ type: 'text', text: message }],
    }),
  });

  res.status(200).json({ ok: true });
}
