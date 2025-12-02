import { useState } from 'react';
import { Trophy, Trash2 } from 'lucide-react';
import { Winner } from '../types/raffle';
import { DeleteWinnerModal } from './DeleteWinnerModal';

interface WinnersDashboardProps {
  winners: Winner[];
  onDeleteWinner?: (week: number) => void;
}

export function WinnersDashboard({ winners, onDeleteWinner }: WinnersDashboardProps) {
  const [deleteModal, setDeleteModal] = useState<{ week: number; name: string } | null>(null);
  return (
    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-xl p-8 border-2 border-amber-200">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-8 h-8 text-amber-600" />
        <h2 className="text-3xl font-bold text-gray-800">Winners Dashboard</h2>
      </div>

      <div className="grid gap-4">
        {winners.map((winner) => (
          <div
            key={winner.week}
            className="bg-white rounded-xl p-6 shadow-md border-l-4 border-amber-500 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Week {winner.week}
                  </span>
                  <span className="text-green-600 font-semibold text-lg">
                    ${winner.prizeAmount}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {winner.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Supervisor:</span> {winner.supervisor}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Department:</span> {winner.department}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Trophy className="w-12 h-12 text-amber-500" />
                {onDeleteWinner && (
                  <button
                    onClick={() => setDeleteModal({ week: winner.week, name: winner.name })}
                    className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"
                    title="Delete Winner"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {deleteModal && (
        <DeleteWinnerModal
          winnerName={deleteModal.name}
          week={deleteModal.week}
          onConfirm={() => {
            if (onDeleteWinner) {
              onDeleteWinner(deleteModal.week);
            }
          }}
          onClose={() => setDeleteModal(null)}
        />
      )}
    </div>
  );
}
