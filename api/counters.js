import { promises as fs } from 'fs';
import path from 'path';

const COUNTER_FILE = path.join(process.cwd(), 'counters.json');

// Initialize counters file if it doesn't exist
async function initCounters() {
  try {
    await fs.access(COUNTER_FILE);
  } catch {
    await fs.writeFile(COUNTER_FILE, JSON.stringify({ visitors: 0, hearts: 0 }));
  }
}

// Read counters from file
async function readCounters() {
  try {
    const data = await fs.readFile(COUNTER_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return { visitors: 0, hearts: 0 };
  }
}

// Write counters to file
async function writeCounters(counters) {
  await fs.writeFile(COUNTER_FILE, JSON.stringify(counters, null, 2));
}

export default async function handler(req, res) {
  await initCounters();

  if (req.method === 'GET') {
    // Get current counters and increment visitor count
    const counters = await readCounters();
    counters.visitors += 1;
    await writeCounters(counters);

    res.status(200).json({
      visitors: counters.visitors,
      hearts: counters.hearts
    });
  } else if (req.method === 'POST' && req.body.action === 'heart') {
    // Increment heart count
    const counters = await readCounters();
    counters.hearts += 1;
    await writeCounters(counters);

    res.status(200).json({
      visitors: counters.visitors,
      hearts: counters.hearts
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
