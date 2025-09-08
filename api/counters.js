const counters = { visitors: 0, hearts: 0 };

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Increment visitor count
    counters.visitors += 1;

    res.status(200).json({
      visitors: counters.visitors,
      hearts: counters.hearts
    });
  } else if (req.method === 'POST') {
    try {
      const body = JSON.parse(req.body || '{}');

      if (body.action === 'heart') {
        // Increment heart count
        counters.hearts += 1;

        res.status(200).json({
          visitors: counters.visitors,
          hearts: counters.hearts
        });
      } else {
        res.status(400).json({ error: 'Invalid action' });
      }
    } catch {
      res.status(400).json({ error: 'Invalid JSON' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
