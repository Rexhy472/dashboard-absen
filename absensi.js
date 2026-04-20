let data = {};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, kelas } = req.body;

    if (!data[userId]) {
      data[userId] = { total: 0, kelas };
    }

    data[userId].total += 1;

    return res.status(200).json({ success: true });
  }

  if (req.method === 'GET') {
    return res.status(200).json(data);
  }
}
