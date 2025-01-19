import { useState, useEffect } from 'react';
import { WrestlerCard } from './WrestlerCard';
import { wrestlersData } from '../data/wrestlers';
import { RosterFilters } from './RosterFilters';

export const WrestlingRoster = () => {
  const [wrestlers, setWrestlers] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    gender: null,
    showTagTeams: false,
  });

  useEffect(() => {
    setWrestlers(wrestlersData);
  }, []);

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = wrestlersData.map((wrestler) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = wrestler.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading images', error);
      }
    };

    preloadImages();
  }, []);

  const champions = wrestlers
    .filter((w) => w.isChampion)
    .sort((a, b) => a.name.localeCompare(b.name));

  const roster = wrestlers.sort((a, b) => a.name.localeCompare(b.name));

  const filteredRoster = roster.filter((wrestler) => {
    const matchesSearch = wrestler.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGender = !filters.gender || wrestler.gender === filters.gender;
    const matchesTeamType = filters.showTagTeams ? wrestler.isTagTeam : !wrestler.isTagTeam;

    return matchesSearch && matchesGender && matchesTeamType;
  });

  if (!imagesLoaded) {
    return (
      <div className="flex justify-center items-center flex-col min-h-screen p-16">
        <img src="/images/wxw.png" alt="wXw" className="w-32 md:w-64 mb-8" />
        <div role="status">
          <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#120303] text-white p-8 flex flex-col items-center justify-center">
      <img src="/images/wxw.png" alt="wXw" className="w-64 mb-8 fill-white" />
      <section className="mb-12">
        <h2 className="text-3xl md:text-7xl font-bold text-center mb-4 md:mb-8">CHAMPIONS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 md:gap-6 max-w-3x4 mx-auto text-center">
          {champions.map((champion) => (
            <WrestlerCard key={champion.id} wrestler={champion} isChampionSection={true} isRosterCard={false} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl md:text-7xl font-bold text-center mb-4 md:mb-8">ROSTER</h2>
        <div className="flex flex-col gap-6 md:flex-row md:justify-between items-center mb-4 md:mb-8">
          {/* Search Bar */}
          <div className="relative w-full md:w-96 max-w-xl">
            <div className="relative group">
              <div className="absolute inset-0 bg-red-500/20 rounded-md blur-md group-hover:bg-red-500/30 transition-all duration-300" />
              <div className="relative flex items-center bg-gray-900/90 rounded-md border-2 border-gray-700 group-hover:border-red-500/50 transition-all duration-300">
                <svg
                  className="w-6 h-6 ml-3 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search wrestlers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2.5 px-3 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-0 text-base sm:text-lg md:text-xl"
                />
              </div>
            </div>
          </div>
          {/* Filters */}
          <RosterFilters filters={filters} setFilters={setFilters} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 max-w-6xl mx-auto text-center">
          {filteredRoster.map((wrestler) => (
            <WrestlerCard key={wrestler.id} wrestler={wrestler} isChampionSection={false} isRosterCard={true} />
          ))}
        </div>
      </section>
    </div>
  );
};
