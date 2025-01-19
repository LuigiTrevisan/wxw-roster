import { useState, useEffect } from 'react';
import { WrestlerCard } from './WrestlerCard';
import { wrestlersData } from '../data/wrestlers';

export const WrestlingRoster = () => {
  const [wrestlers, setWrestlers] = useState([]);

  useEffect(() => {
    // In a real app, this would be an API call
    setWrestlers(wrestlersData);
  }, []);

  const champions = wrestlers
    .filter(w => w.isChampion)
    .sort((a, b) => a.order - b.order);

  const roster = wrestlers.sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-[#120303] text-white p-8 flex flex-col items-center justify-center">
      <img src="/images/wxw.png" alt="wXw" className="w-64 mb-8 fill-white" />
      <section className="mb-12">
        <h2 className="text-7xl font-bold text-center mb-8">CHAMPIONS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-3x4 mx-auto text-center">
          {champions
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((champion, index) => (
              <div
                key={champion.id}
                className={`col-span-1 ${index >= champions.length - (champions.length % 3) ? 'lg:col-span-1' : ''}`}
              >
                <WrestlerCard
                  wrestler={champion}
                  isChampionSection={true}
                  isRosterCard={false} // Keep larger size for champions
                />
              </div>
            ))}
        </div>
      </section>

      <section>
        <h2 className="text-7xl font-bold text-center mb-8">ROSTER</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-3x4 mx-auto">
          {roster
            .filter(wrestler => !wrestler.isTagTeam)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(wrestler => (
              <WrestlerCard
                key={wrestler.id}
                wrestler={wrestler}
                isChampionSection={false}
                isRosterCard={true} // Smaller cards for roster
              />
            ))}
        </div>
      </section>
    </div>
  );
};
