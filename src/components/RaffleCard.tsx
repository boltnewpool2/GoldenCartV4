import { Calendar, Users, Gift, CheckCircle, Play } from 'lucide-react';
import { RaffleWeek } from '../types/raffle';
import { CountdownTimer } from './CountdownTimer';

interface RaffleCardProps {
  raffle: RaffleWeek;
  onStartDraw?: () => void;
  canDraw?: boolean;
}

export function RaffleCard({ raffle, onStartDraw, canDraw = false }: RaffleCardProps) {
  const isCompleted = raffle.status === 'completed';
  const isActive = raffle.status === 'active';
  const isComingSoon = raffle.status === 'coming_soon';

  return (
    <div
      className={`rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl ${
        isCompleted
          ? 'bg-gray-100 opacity-75'
          : isActive
          ? 'bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-400'
          : 'bg-gradient-to-br from-slate-50 to-gray-50'
      }`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-800">
            Week {raffle.week}
          </h3>
          {isCompleted && (
            <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-semibold">Winner Declared</span>
            </div>
          )}
          {isActive && (
            <div className="bg-cyan-500 text-white px-4 py-1 rounded-full">
              <span className="text-sm font-semibold">Active</span>
            </div>
          )}
          {isComingSoon && (
            <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white px-4 py-1 rounded-full shadow-lg animate-pulse">
              <span className="text-sm font-semibold">Coming Soon</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-green-600 mb-4">
          <Gift className="w-5 h-5" />
          <span className="text-lg font-semibold">Prize: $300</span>
        </div>

        {isCompleted && raffle.winner && (
          <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
            <p className="text-sm text-gray-500 mb-2">Winner</p>
            <p className="font-bold text-lg text-gray-800">{raffle.winner.name}</p>
            <p className="text-sm text-gray-600 mt-1">
              {raffle.winner.supervisor} • {raffle.winner.department}
            </p>
          </div>
        )}

        {isActive && (
          <>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <Users className="w-5 h-5" />
              <span className="font-medium">
                {raffle.contestants.length} Contestants
              </span>
            </div>
            <div className="bg-white rounded-lg p-4 max-h-60 overflow-y-auto mb-4">
              <div className="space-y-2">
                {raffle.contestants.map((contestant, idx) => (
                  <div
                    key={idx}
                    className="border-b border-gray-100 last:border-0 pb-2 last:pb-0"
                  >
                    <p className="font-semibold text-gray-800 text-sm">
                      {contestant.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {contestant.supervisor} • {contestant.department}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {canDraw && onStartDraw && (
              <button
                onClick={onStartDraw}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Play className="w-5 h-5" />
                Start Raffle Draw
              </button>
            )}
          </>
        )}

        {isComingSoon && raffle.drawDate && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">
                Draw Date: {raffle.drawDate.toLocaleDateString()}
              </span>
            </div>
            <div className="bg-white rounded-lg p-4 mb-4">
              <p className="text-center text-sm text-gray-600 mb-3 font-medium">
                Time Until Draw
              </p>
              <CountdownTimer targetDate={raffle.drawDate} />
            </div>
            {canDraw && onStartDraw && new Date() >= raffle.drawDate && (
              <button
                onClick={onStartDraw}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Play className="w-5 h-5" />
                Start Raffle Draw
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
