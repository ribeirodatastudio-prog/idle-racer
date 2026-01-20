import { useGame } from '../context/GameContext';
import { SEGMENT_TYPES } from '../engine/data';
import { Map, Flag } from 'lucide-react';

const TrackMap = () => {
  const { currentTrack } = useGame();

  if (!currentTrack) return <div className="p-4">No Track Data</div>;

  const getSegmentStyle = (type: string) => {
    switch (type) {
      case SEGMENT_TYPES.LOW_SPEED_CORNER: return { bg: 'bg-rose-600', width: 'w-4', height: 'h-4', label: 'L' };
      case SEGMENT_TYPES.MEDIUM_SPEED_CORNER: return { bg: 'bg-orange-500', width: 'w-4', height: 'h-4', label: 'M' };
      case SEGMENT_TYPES.HIGH_SPEED_CORNER: return { bg: 'bg-yellow-400', width: 'w-4', height: 'h-4', label: 'H' };
      case SEGMENT_TYPES.SHORT_STRAIGHT: return { bg: 'bg-emerald-600', width: 'w-8', height: 'h-2', label: '' };
      case SEGMENT_TYPES.MEDIUM_STRAIGHT: return { bg: 'bg-emerald-500', width: 'w-16', height: 'h-2', label: '' };
      case SEGMENT_TYPES.LONG_STRAIGHT: return { bg: 'bg-emerald-400', width: 'w-32', height: 'h-2', label: '' };
      default: return { bg: 'bg-slate-700', width: 'w-4', height: 'h-4', label: '?' };
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
         <div className="flex items-center gap-2">
            <Map size={16} className="text-slate-500" />
            <span className="font-bold text-slate-200">{currentTrack.name}</span>
         </div>
         <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>{currentTrack.laps} Laps</span>
            <span>Diff: {Math.round(currentTrack.difficulty)}</span>
         </div>
      </div>

      {/* Visual Map */}
      <div className="p-6 flex-1 overflow-y-auto bg-slate-900 flex items-center justify-center">
         <div className="flex flex-wrap gap-1 items-center justify-center max-w-full">
            {currentTrack.segments.map((seg, idx) => {
               const style = getSegmentStyle(seg);
               return (
                  <div
                    key={idx}
                    className={`${style.bg} ${style.width} ${style.height} rounded-sm flex items-center justify-center text-[8px] font-bold text-slate-900`}
                    title={seg}
                  >
                    {style.label}
                  </div>
               );
            })}
            <div className="w-4 h-4 flex items-center justify-center">
               <Flag size={12} className="text-white" />
            </div>
         </div>
      </div>

      {/* Legend / Info */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs space-y-2">
         <div className="flex gap-4 justify-center">
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-rose-600 rounded-full"></div> Slow</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-orange-500 rounded-full"></div> Med</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-yellow-400 rounded-full"></div> Fast</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div> Straight</div>
         </div>
         <div className="text-center text-slate-600">
            Race Events Log (Coming Soon)
         </div>
      </div>
    </div>
  );
};

export default TrackMap;
