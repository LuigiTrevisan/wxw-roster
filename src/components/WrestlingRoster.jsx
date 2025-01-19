import { useState, useEffect } from 'react';
import { WrestlerCard } from './WrestlerCard';
import { wrestlersData } from '../data/wrestlers';

export const WrestlingRoster = () => {
  const [wrestlers, setWrestlers] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    setWrestlers(wrestlersData);
  }, []);

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = wrestlersData.map(wrestler => {
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
  }, [wrestlersData]);

  const champions = wrestlers
    .filter(w => w.isChampion)
    .sort((a, b) => a.order - b.order);

  const roster = wrestlers.sort((a, b) => a.order - b.order);

  if (!imagesLoaded) {
    return (
    <div className="jusitfy-center flex items-center flex-col min-h-screen p-16">
      <img src="/images/wxw.png" alt="wXw" className="w-64 mb-8 fill-white" />
      <div role="status">
        <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>)
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-3x4 mx-auto text-center">
          {roster.map(wrestler => (
            <WrestlerCard
              key={wrestler.id}
              wrestler={wrestler}
              isChampionSection={false}
              isRosterCard={true}
            />
          ))}
        </div>
      </section>
    </div>
  );
};