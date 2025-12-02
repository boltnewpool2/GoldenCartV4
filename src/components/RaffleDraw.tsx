import { useState, useEffect, useRef } from 'react';
import { Trophy, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Contestant } from '../types/raffle';

interface RaffleDrawProps {
  contestants: Contestant[];
  week: number;
  onComplete: (winner: Contestant) => void;
  onClose: () => void;
}

export function RaffleDraw({ contestants, week, onComplete, onClose }: RaffleDrawProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(true);
  const [winner, setWinner] = useState<Contestant | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    let speed = 50;
    const accelerate = () => {
      if (speed < 500) {
        speed += 15;
      }
    };

    const cycleContestants = () => {
      setCurrentIndex((prev) => (prev + 1) % contestants.length);
      accelerate();
      intervalRef.current = setTimeout(cycleContestants, speed);
    };

    cycleContestants();

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      const winnerIndex = Math.floor(Math.random() * contestants.length);
      const selectedWinner = contestants[winnerIndex];
      setWinner(selectedWinner);
      setIsDrawing(false);

      const duration = 5000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);
    }, 60000);

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      clearInterval(countdown);
    };
  }, [contestants]);

  const handleComplete = () => {
    if (!winner) return;

    const storedPassword = localStorage.getItem('raffle_admin_password') || 'InternationalMessaging@20';

    if (password === storedPassword) {
      onComplete(winner);
      onClose();
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Trophy className="w-16 h-16 text-amber-500" />
          </div>

          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Week {week} Raffle Draw
          </h2>

          {isDrawing && (
            <div className="mb-8">
              <div className="text-2xl font-semibold text-cyan-600 mb-4">
                Time Remaining: {timeLeft}s
              </div>
              <div className="bg-gradient-to-r from-cyan-100 to-blue-100 rounded-2xl p-8 min-h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2 animate-pulse">
                    {contestants[currentIndex]?.name}
                  </div>
                  <div className="text-lg text-gray-600">
                    {contestants[currentIndex]?.supervisor}
                  </div>
                  <div className="text-sm text-gray-500">
                    {contestants[currentIndex]?.department}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isDrawing && winner && (
            <div className="mb-8 animate-bounce-in">
              <div className="text-3xl font-bold text-green-600 mb-4">
                🎉 Winner! 🎉
              </div>
              <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-8 border-4 border-amber-400">
                <div className="text-4xl font-bold text-gray-800 mb-3">
                  {winner.name}
                </div>
                <div className="text-xl text-gray-700 mb-2">
                  Supervisor: {winner.supervisor}
                </div>
                <div className="text-lg text-gray-600 mb-4">
                  Department: {winner.department}
                </div>
                <div className="text-2xl font-bold text-green-600">
                  Prize: $300
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Admin Password to Confirm Winner
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleComplete();
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter password"
                    autoFocus
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                  )}
                </div>

                <button
                  onClick={handleComplete}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
                >
                  Confirm Winner
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
