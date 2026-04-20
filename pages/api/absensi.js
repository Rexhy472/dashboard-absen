let data = {
  leaderboard: {},
  logs: []
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, nama, kelas, jam } = req.body;

    if (!data.leaderboard[userId]) {
      data.leaderboard[userId] = {
        nama,
        kelas,
        total: 0
      };
    }

    data.leaderboard[userId].total += 1;

    data.logs.unshift({ nama, kelas, jam });

    return res.status(200).json({ success: true });
  }

  if (req.method === 'GET') {
    return res.status(200).json(data);
  }
}
