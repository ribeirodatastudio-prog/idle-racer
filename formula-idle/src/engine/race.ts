import type { Driver } from './grid';
import type { Track } from './track';
import { BASE_SEGMENT_TIMES, SEGMENT_WEIGHTS, SEGMENT_TYPES, type SegmentType } from './data';
import { randomFloat } from './mathUtils';

// Helper to get stats safely
const getStat = (driver: Driver, statName: string): number => {
  // @ts-ignore
  return driver.stats[statName] || 0;
};

// Calculate the Score for a driver on a specific segment type
const calculateSegmentScore = (driver: Driver, segmentType: SegmentType): number => {
  const weights = SEGMENT_WEIGHTS[segmentType];
  let rawScore = 0;

  for (const [stat, weight] of Object.entries(weights)) {
    rawScore += getStat(driver, stat) * weight;
  }

  // Apply Instincts Multiplier
  const instincts = getStat(driver, 'Instincts');
  const multiplier = 1 + Math.pow(instincts, 0.6) / 50;

  return rawScore * multiplier;
};

export const calculateQualifyingPace = (driver: Driver, track: Track): number => {
  let totalTime = 0;

  track.segments.forEach(segmentType => {
    const baseTime = BASE_SEGMENT_TIMES[segmentType];
    const score = calculateSegmentScore(driver, segmentType);

    // Avoid division by zero
    const safeScore = Math.max(score, 1);

    const ratio = track.difficulty / safeScore;

    const segmentTime = baseTime * Math.pow(ratio, 0.8);
    totalTime += segmentTime;
  });

  return totalTime;
};

export interface RaceConditions {
  gapToAhead: number; // Seconds
  carAheadInstincts: number;
  currentRank: number;
  expectedRank: number;
}

export const simulateLap = (
  driver: Driver,
  track: Track,
  qualyTime: number,
  conditions: RaceConditions | null
): { lapTime: number; overtakeSuccess: boolean } => {

  // 1. Base Time (Qualy Time)
  let lapTime = qualyTime;

  // 2. Apply Consistency Variance
  const consistency = getStat(driver, 'Consistency');
  const variancePercent = 200 / (consistency + 50);

  const varianceMultiplier = randomFloat(1 - variancePercent/100, 1 + variancePercent/100);
  lapTime *= varianceMultiplier;

  // 3. Overtaking Logic
  let overtakeSuccess = false;
  let isStuck = false;

  if (conditions) {
    const isBehindSchedule = conditions.currentRank > conditions.expectedRank;

    if (isBehindSchedule && conditions.gapToAhead < 3.0 && conditions.gapToAhead > 0) {
      const overtakingStat = getStat(driver, 'Overtaking');
      const opponentInstincts = conditions.carAheadInstincts;

      let successfulPass = false;

      // Iterate segments to find straights
      for (const segment of track.segments) {
        if (successfulPass) break;

        let weight = 0;
        if (segment === SEGMENT_TYPES.LONG_STRAIGHT) weight = 2.0;
        if (segment === SEGMENT_TYPES.MEDIUM_STRAIGHT) weight = 1.5;
        if (segment === SEGMENT_TYPES.SHORT_STRAIGHT) weight = 1.0;

        if (weight > 0) {
           const attackScore = overtakingStat * weight * randomFloat(0.8, 1.2);
           const defendScore = opponentInstincts * randomFloat(0.8, 1.2);

           if (attackScore > defendScore) {
             successfulPass = true;
           }
        }
      }

      if (successfulPass) {
        overtakeSuccess = true;
      } else {
        isStuck = true;
      }
    }
  }

  // 4. Apply Dirty Air Penalty
  if (isStuck) {
    lapTime *= 1.15;
  }

  return { lapTime, overtakeSuccess };
};
