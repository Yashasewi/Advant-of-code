import * as fs from 'node:fs';


// Function to read lines from a file
const asLines = (fname) => {
  const text = fs.readFileSync(fname, 'utf8');
  return text.split('\n').filter((l) => l.length > 0);
};

// Helper function to check if a position is valid
const valid = (map, x, y) => x >= 0 && x < map[0].length && y >= 0 && y < map.length;

// Main function to solve the problem
const main = () => {
  const lines = asLines('./input.txt');
  const map = lines.map(l => l.split(""));

  const antennaByFreq = {};
  map.forEach((row, y) => row.forEach((freq, x) => {
    if (freq === '.') return;
    if (!antennaByFreq[freq]) antennaByFreq[freq] = [];
    antennaByFreq[freq].push([x, y]);
  }));

  const A1 = new Set();
  const A2 = new Set();

  const R = map.length;
  const C = map[0].length;

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      for (const [freq, positions] of Object.entries(antennaByFreq)) {
        for (let i = 0; i < positions.length; i++) {
          for (let j = 0; j < positions.length; j++) {
            if (i === j) continue;

            const [r1, c1] = positions[i];
            const [r2, c2] = positions[j];

            const d1 = Math.abs(r - r1) + Math.abs(c - c1);
            const d2 = Math.abs(r - r2) + Math.abs(c - c2);

            const dr1 = r - r1;
            const dr2 = r - r2;
            const dc1 = c - c1;
            const dc2 = c - c2;

            if ((d1 === 2 * d2 || d1 * 2 === d2) && valid(map, r, c) && (dr1 * dc2 === dc1 * dr2)) {
              A1.add(`${r},${c}`);
            }
            if (valid(map, r, c) && (dr1 * dc2 === dc1 * dr2)) {
              A2.add(`${r},${c}`);
            }
          }
        }
      }
    }
  }

  console.log(`Part 1: ${A1.size}`);
  console.log(`Part 2: ${A2.size}`);
}

main();
