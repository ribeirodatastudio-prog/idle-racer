import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { FastForward, Clock, Play, Flag } from 'lucide-react';
import GaragePanel from './GaragePanel';
import TimingTower from './TimingTower';
import TrackMap from './TrackMap';

const Dashboard = () => {
  const { gameState, actions, season, economy, getPlayerTeam, raceData } = useGame();
  const playerTeam = getPlayerTeam();

  // 15 minute timer
  const [timeLeft, setTimeLeft] = useState(15 * 60); // Seconds

  // HQ Timer
  useEffect(() => {
    if (gameState !== 'HQ') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          actions.startQualifying();
          return 15 * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, actions]);

  // Race Loop
  useEffect(() => {
    if (gameState !== 'RACE' || raceData.isRaceFinished) return;

    const interval = setInterval(() => {
        actions.simulateTick();
    }, 200); // 200ms per lap tick

    return () => clearInterval(interval);
  }, [gameState, raceData.isRaceFinished, actions]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleMainAction = () => {
    if (gameState === 'HQ') {
      actions.startQualifying();
      setTimeLeft(15 * 60);
    } else if (gameState === 'QUALIFYING') {
      actions.startRace();
    } else if (gameState === 'RACE') {
       if (raceData.isRaceFinished) {
           actions.nextRace();
       } else {
           // Simulate multiple ticks or speed up?
           // For now, just let it run. Maybe decrease interval?
           // User wants "Simulate Now" to complete it.
           // I'll implement a simple loop here to finish it.
           // But React state updates are async.
           // Maybe just set a "fastForward" state?
           // Or just trust the user to wait 200ms * 60 laps = 12 seconds.
           // Prompt says "Simulate Now (debugging)".
           // Let's create a loop to call tick until finished.
           // NOTE: calling simulateTick in loop might batch updates and result in 1 render.
           // It's safer to just rely on the tick.
       }
    }
  };

  const getButtonConfig = () => {
      if (gameState === 'HQ') return { text: 'SIMULATE NOW', icon: FastForward, color: 'bg-race-purple hover:bg-purple-600' };
      if (gameState === 'QUALIFYING') return { text: 'START RACE', icon: Play, color: 'bg-emerald-600 hover:bg-emerald-500' };
      if (gameState === 'RACE') {
          if (raceData.isRaceFinished) {
              return { text: 'NEXT RACE', icon: Flag, color: 'bg-race-gold hover:bg-yellow-500 text-slate-900' };
          }
          return { text: 'RACING...', icon: Clock, color: 'bg-slate-700 cursor-not-allowed' };
      }
      return { text: 'WAIT...', icon: Clock, color: 'bg-slate-700' };
  };

  const btn = getButtonConfig();

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-200 overflow-hidden font-mono">
      {/* Top Bar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
             <span className="text-xs text-slate-500 uppercase">Team</span>
             <span className="font-bold text-race-gold">{playerTeam?.name}</span>
          </div>
          <div className="flex flex-col">
             <span className="text-xs text-slate-500 uppercase">Tier</span>
             <span className="font-bold">1</span>
          </div>
          <div className="flex flex-col">
             <span className="text-xs text-slate-500 uppercase">Season Race</span>
             <span className="font-bold">{season.raceNumber} / {season.totalRaces}</span>
          </div>
          <div className="flex flex-col">
             <span className="text-xs text-slate-500 uppercase">Funds</span>
             <span className="font-bold text-emerald-400">{economy.points.toLocaleString()} PTS</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-4 py-2 rounded bg-slate-800 border border-slate-700 ${gameState === 'HQ' ? 'opacity-100' : 'opacity-50'}`}>
            <Clock size={16} className="text-slate-400" />
            <span className="font-mono text-xl">{gameState === 'HQ' ? formatTime(timeLeft) : '--:--'}</span>
          </div>

          <button
            onClick={handleMainAction}
            disabled={gameState === 'RACE' && !raceData.isRaceFinished}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-colors text-white ${btn.color}`}
          >
            <btn.icon size={16} className={btn.color.includes('text-slate-900') ? 'text-slate-900' : 'text-white'} />
            <span className="text-sm font-bold">
              {btn.text}
            </span>
          </button>
        </div>
      </header>

      {/* Main Content - 3 Column Layout */}
      <main className="flex-1 grid grid-cols-12 gap-1 p-1 overflow-hidden">
        {/* Left: Garage (3 cols) */}
        <section className="col-span-3 bg-slate-900/50 border border-slate-800 rounded overflow-hidden flex flex-col">
          <GaragePanel />
        </section>

        {/* Center: Timing Tower (5 cols) */}
        <section className="col-span-5 bg-slate-900/50 border border-slate-800 rounded overflow-hidden flex flex-col relative">
           <TimingTower />
        </section>

        {/* Right: Map & Log (4 cols) */}
        <section className="col-span-4 bg-slate-900/50 border border-slate-800 rounded overflow-hidden flex flex-col">
           <TrackMap />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
