# Formula Idle Manager

A text-based, math-heavy incremental idle game managing a Racing Team.

## Core Mechanics

### 1. The Grid (Data & Economy)
- **Grid Size:** 20 Teams / 40 Drivers.
- **Stats Distribution:** Logarithmic Curve.
  - **Rank 1 Team:** 200 Total Stats (per driver).
  - **Rank 20 Team:** 20 Total Stats (per driver).
  - Formula: `StatTotal = Min + (Max - Min) * ((TotalTeams - Rank) / (TotalTeams - 1)) ^ DistributionFactor`.
- **Drivers:** 2 per team. Intra-team variance of 1.01x to 1.10x.
- **Stats:** Cornering, Overtaking, Braking, Instincts, Acceleration, Consistency, Pace.
- **Economy:**
  - Base Cost: 1.
  - Growth: `Cost * 1.05 ^ Level`.
  - Currency: Points (40 for 1st, 1 for 40th).

### 2. Simulation Engine

#### Track Generation
- **Segments:** 13-28 random segments.
- **Types:** Low/Med/High Speed Corners, Short/Med/Long Straights.
- **Constraints:** Must have 1 Long Straight.
- **Laps:** `Clamp(Round(1000 / Segments), 50, 80)`.
- **Difficulty:** Random 0.5x - 1.5x of highest tier stats.

#### Race Logic
- **Base Segment Times:**
  - Corners: Low(6s), Med(4.5s), High(3s).
  - Straights: Short(2s), Med(5s), Long(12s).
- **Segment Weights:**
  - Low Corner: 40% Brake, 40% Accel, 20% Corn.
  - High Corner: 80% Corn, 10% Accel, 10% Brake.
  - Straight: 80% Pace, 20% Accel.
- **Modifiers:**
  - **Instincts:** `Multiplier = 1 + (Instincts ^ 0.6) / 50`.
  - **Dirty Air:** +15% Lap Time Penalty if stuck behind a car (<3s gap).
  - **Overtaking:** Checked on straights. Success removes Dirty Air penalty.
- **Qualifying:** `Time = BaseTime * (Difficulty / DriverScore)^0.8`.

## Tech Stack
- React (Vite)
- Tailwind CSS
- Recharts
