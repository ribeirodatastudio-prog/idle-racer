import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Play } from 'lucide-react';

const WelcomeScreen = () => {
  const { actions } = useGame();
  const [teamName, setTeamName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim()) {
      actions.startNewGame(teamName);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
      <div className="max-w-md w-full p-8 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl">
        <h1 className="text-4xl font-bold text-center mb-2 text-race-gold tracking-tighter">
          FORMULA IDLE
        </h1>
        <p className="text-center text-slate-400 mb-8 font-mono text-sm">
          TEAM PRINCIPAL SIMULATION
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
              Initialize Team Protocol
            </label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter Team Name..."
              className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded focus:outline-none focus:border-race-purple transition-colors font-mono"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={!teamName.trim()}
            className="w-full bg-race-purple hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded flex items-center justify-center gap-2 transition-all uppercase tracking-widest"
          >
            <Play size={20} />
            Establish Team
          </button>
        </form>
      </div>
    </div>
  );
};

export default WelcomeScreen;
