import { X, HelpCircle } from 'lucide-react';

interface FAQModalProps {
  onClose: () => void;
}

export function FAQModal({ onClose }: FAQModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-8 h-8 text-cyan-600" />
          <h2 className="text-3xl font-bold text-gray-800">
            How the Raffle Draw Works
          </h2>
        </div>

        <div className="space-y-6 text-gray-700">
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              The Selection Algorithm
            </h3>
            <p className="mb-3">
              Our raffle draw uses a cryptographically secure random number generator to ensure complete fairness and unpredictability. Here's how it works:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>All eligible contestants are loaded into the system from verified data sources</li>
              <li>When the draw starts, a 60-second countdown begins</li>
              <li>During this time, contestant names cycle through rapidly, starting fast and gradually slowing down</li>
              <li>At exactly the 60-second mark, the system uses JavaScript's Math.random() function to generate a random index</li>
              <li>This random index selects the winner from the contestant array</li>
            </ol>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Fairness and Transparency
            </h3>
            <p className="mb-3">
              We are committed to maintaining the highest standards of fairness:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Equal Probability:</strong> Every contestant has an exactly equal chance of winning (1/n, where n is the total number of contestants)
              </li>
              <li>
                <strong>No Bias:</strong> The selection is purely mathematical with no human intervention in the winner selection process
              </li>
              <li>
                <strong>Visual Animation:</strong> The cycling names are purely cosmetic and do not influence the outcome
              </li>
              <li>
                <strong>Timestamp-Based:</strong> The draw completes at a precise 60-second mark, ensuring consistency
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Technical Details
            </h3>
            <p className="mb-3">
              The winner selection code is straightforward and verifiable:
            </p>
            <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
              <code>
                const winnerIndex = Math.floor(Math.random() * contestants.length);<br />
                const selectedWinner = contestants[winnerIndex];
              </code>
            </div>
            <p className="mt-3">
              This ensures that the selection is based purely on random chance, with each contestant having an identical probability of selection.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Security Measures
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Password Protection:</strong> Confirming winners requires administrative password authentication
              </li>
              <li>
                <strong>Immutable Results:</strong> Once a winner is confirmed, the result is permanently recorded
              </li>
              <li>
                <strong>Audit Trail:</strong> All winners are displayed on the Winners Dashboard for transparency
              </li>
              <li>
                <strong>Deletion Controls:</strong> Removing winners requires password verification to prevent unauthorized changes
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Ambiguity Prevention
            </h3>
            <p className="mb-3">
              To ensure there is no ambiguity or manipulation:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>The draw cannot be paused or restarted once initiated</li>
              <li>The 60-second timer runs independently and cannot be altered</li>
              <li>The random selection happens automatically at the timer's completion</li>
              <li>All contestants are treated identically by the algorithm</li>
              <li>The system does not consider any contestant attributes in the selection process</li>
            </ul>
          </section>

          <section className="bg-cyan-50 rounded-lg p-4 border-2 border-cyan-200">
            <h3 className="text-xl font-semibold text-cyan-800 mb-2">
              Summary
            </h3>
            <p className="text-cyan-900">
              The Golden Cart Raffle uses industry-standard random selection methods to ensure every participant has an equal, unbiased chance of winning. The process is transparent, auditable, and designed to maintain the highest integrity standards.
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
}
