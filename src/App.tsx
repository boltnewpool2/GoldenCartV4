import { useState, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';
import { GoDaddyLogo } from './components/GoDaddyLogo';
import { WinnersDashboard } from './components/WinnersDashboard';
import { RaffleCard } from './components/RaffleCard';
import { RaffleDraw } from './components/RaffleDraw';
import { FAQModal } from './components/FAQModal';
import { RaffleWeek, Winner, Contestant } from './types/raffle';
import week1Data from './data/week1.json';
import week2Data from './data/week2.json';
import week3Data from './data/week3.json';
import week7Data from './data/week7.json';

function App() {
  const [winners, setWinners] = useState<Winner[]>(() => {
    const stored = localStorage.getItem('raffle_winners');
    if (stored) {
      return JSON.parse(stored);
    }
    return [
      {
        name: 'Syed Ala Uddin',
        supervisor: 'Kalyan',
        department: 'International Hosting',
        week: 1,
        prizeAmount: 300,
      },
      {
        name: 'Dhanraj S',
        supervisor: 'Srikanth Janga',
        department: 'International Messaging - Hosting',
        week: 2,
        prizeAmount: 300,
      },
      {
        name: 'Aakriti Arya',
        supervisor: 'Azharuddin MD_CDT',
        department: 'Outbound',
        week: 3,
        prizeAmount: 300,
      },
    ];
  });

  const [activeDrawWeek, setActiveDrawWeek] = useState<number | null>(null);
  const [raffles, setRaffles] = useState<RaffleWeek[]>([]);
  const [showFAQ, setShowFAQ] = useState(false);

  useEffect(() => {
    const raffleData: RaffleWeek[] = [
      {
        week: 1,
        status: winners.some(w => w.week === 1) ? 'completed' : 'active',
        contestants: week1Data,
        winner: winners.find(w => w.week === 1),
      },
      {
        week: 2,
        status: winners.some(w => w.week === 2) ? 'completed' : 'active',
        contestants: week2Data,
        winner: winners.find(w => w.week === 2),
      },
      {
        week: 3,
        status: winners.some(w => w.week === 3) ? 'completed' : 'active',
        contestants: week3Data,
        winner: winners.find(w => w.week === 3),
      },
      {
        week: 4,
        status: 'coming_soon',
        drawDate: new Date('2025-12-09'),
        contestants: [],
      },
      {
        week: 5,
        status: 'coming_soon',
        drawDate: new Date('2025-12-16'),
        contestants: [],
      },
      {
        week: 6,
        status: 'coming_soon',
        drawDate: new Date('2025-12-23'),
        contestants: [],
      },
      {
        week: 7,
        status: 'coming_soon',
        drawDate: new Date('2025-12-30'),
        contestants: week7Data,
      },
    ];
    setRaffles(raffleData);
  }, [winners]);

  useEffect(() => {
    localStorage.setItem('raffle_winners', JSON.stringify(winners));
  }, [winners]);

  const handleStartDraw = (week: number) => {
    setActiveDrawWeek(week);
  };

  const handleDrawComplete = (winner: Contestant, week: number) => {
    const newWinner: Winner = {
      ...winner,
      week,
      prizeAmount: 300,
    };
    setWinners(prev => [...prev, newWinner]);
  };

  const handleDeleteWinner = (week: number) => {
    setWinners(prev => prev.filter(w => w.week !== week));
  };

  const currentDraw = raffles.find(r => r.week === activeDrawWeek);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex justify-center mb-3">
            <GoDaddyLogo className="w-64 h-auto" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Golden Cart Raffle
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Join our exciting weekly raffle for a chance to win $300! New winners announced every week.
          </p>
          <button
            onClick={() => setShowFAQ(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl"
          >
            <HelpCircle className="w-5 h-5" />
            How Does the Draw Work?
          </button>
        </header>

        <div className="mb-12">
          <WinnersDashboard winners={winners} onDeleteWinner={handleDeleteWinner} />
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Weekly Raffles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {raffles.map((raffle) => (
            <RaffleCard
              key={raffle.week}
              raffle={raffle}
              canDraw={raffle.contestants.length > 0 && raffle.status !== 'completed'}
              onStartDraw={() => handleStartDraw(raffle.week)}
            />
          ))}
        </div>

        {activeDrawWeek && currentDraw && currentDraw.contestants.length > 0 && (
          <RaffleDraw
            contestants={currentDraw.contestants}
            week={activeDrawWeek}
            onComplete={(winner) => handleDrawComplete(winner, activeDrawWeek)}
            onClose={() => setActiveDrawWeek(null)}
          />
        )}

        <footer className="mt-16 text-center text-gray-600">
          <p className="text-sm mb-2">
            Golden Cart Raffle • GoDaddy • Each winner receives $300
          </p>
          <p className="text-xs text-gray-500">
            Designed and developed by Abhishekh Dey ❤️
          </p>
        </footer>

        {showFAQ && <FAQModal onClose={() => setShowFAQ(false)} />}
      </div>
    </div>
  );
}

export default App;
