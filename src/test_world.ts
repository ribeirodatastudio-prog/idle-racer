import { generateGrid } from './engine/grid';
import { generateTrack } from './engine/track';

console.log("=== Generating Grid ===");
const grid = generateGrid();
console.log(`Generated ${grid.length} teams.`);

const team1 = grid[0];
console.log(`Team 1: ${team1.name} (Rank ${team1.rank})`);
console.log(`  Driver 1: ${team1.drivers[0].name}, Total Stats: ${team1.drivers[0].totalStats}`);
console.log(`  Driver 2: ${team1.drivers[1].name}, Total Stats: ${team1.drivers[1].totalStats}`);
console.log(`  Example Stat (Pace): D1=${team1.drivers[0].stats.Pace}, D2=${team1.drivers[1].stats.Pace}`);

const team20 = grid[19];
console.log(`Team 20: ${team20.name} (Rank ${team20.rank})`);
console.log(`  Driver 1: ${team20.drivers[0].name}, Total Stats: ${team20.drivers[0].totalStats}`);
console.log(`  Driver 2: ${team20.drivers[1].name}, Total Stats: ${team20.drivers[1].totalStats}`);

console.log("\n=== Generating Track ===");
const track = generateTrack();
console.log(`Track: ${track.name}`);
console.log(`Segments: ${track.segments.length}`);
console.log(`Laps: ${track.laps}`);
console.log(`Difficulty (Target Stats): ${track.difficulty.toFixed(2)}`);
console.log(`Segment Types Sample: ${track.segments.slice(0, 5).join(', ')}...`);
