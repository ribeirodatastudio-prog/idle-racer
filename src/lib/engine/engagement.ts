export type PeekType = "HOLD" | "JIGGLE" | "WIDE" | "SWING";

export interface EngagementContext {
  isCrossZone: boolean;
  peekType: PeekType;        // attacker behavior
  defenderHolding: boolean;  // defender is set on angle
  attackerCover: number;     // 0..1 from zone.cover
  defenderCover: number;     // 0..1 from zone.cover
  flashedAttacker: number;   // 0..1
  flashedDefender: number;   // 0..1
  smoked: boolean;           // blocks LOS
}
