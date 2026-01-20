import { calculateTeamStatsBudget } from './engine/mathUtils';
import { GRID } from './engine/data';

console.log("=== Testing Grid Distribution ===");
console.log(`Min: ${GRID.TIER_1_MIN_STATS}, Max: ${GRID.TIER_1_MAX_STATS}, Factor: ${GRID.DISTRIBUTION_FACTOR}`);

const ranksToTest = [1, 2, 3, 4, 10, 15, 19, 20];

ranksToTest.forEach(rank => {
  const stats = calculateTeamStatsBudget(
    rank,
    GRID.TOTAL_TEAMS,
    GRID.TIER_1_MIN_STATS,
    GRID.TIER_1_MAX_STATS,
    GRID.DISTRIBUTION_FACTOR
  );
  console.log(`Rank ${rank}: ${stats.toFixed(2)} stats`);
});

console.log("\n=== Testing Cost Scaling ===");
import { calculateStatCost } from './engine/mathUtils';
[0, 10, 50, 100].forEach(lvl => {
    console.log(`Level ${lvl} Cost: ${calculateStatCost(lvl).toFixed(2)}`);
});
