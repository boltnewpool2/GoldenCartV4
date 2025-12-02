import { useState } from 'react';
import { X, Trash2 } from 'lucide-react';

interface DeleteWinnerModalProps {
  winnerName: string;
  week: number;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteWinnerModal({ winnerName, week, onConfirm, onClose }: DeleteWinnerModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedPassword = localStorage.getItem('raffle_admin_password') || 'InternationalMessaging@20';

    if (password === storedPassword) {
      onConfirm();
      onClose();
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 rounded-full p-3">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Delete Winner
          </h3>
          <p className="text-gray-600">
            Are you sure you want to delete the winner for Week {week}?
          </p>
          <p className="text-gray-800 font-semibold mt-2">
            {winnerName}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Admin Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter password"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
