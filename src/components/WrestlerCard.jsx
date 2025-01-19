export const WrestlerCard = ({ wrestler, isChampionSection, isRosterCard }) => {
  // Use fixed aspect ratios for responsiveness while maintaining a 3x4 size
  const cardClass = isRosterCard
    ? "aspect-[3/4] w-60 sm:w-64 lg:w-72" // Adjust sizes for roster cards
    : "aspect-[3/4] w-64 sm:w-72 lg:w-80"; // Adjust sizes for champion cards

  return (
    <div className="p-2">
      <div className="bg-gradient-to-b from-[#454545] to-[#757575] overflow-hidden border-4 border-[#c7c7c7] rounded-lg">
        <div className="relative">
          {/* Responsive image with the same aspect ratio as the card */}
          <img
            src={wrestler.image}
            alt={wrestler.name}
            className={`w-full h-full object-cover transition-transform hover:scale-110 ${cardClass}`}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-3">
            <h1 className="text-center font-bold text-lg sm:text-xl lg:text-2xl text-white">
              {wrestler.name}
            </h1>
            {isChampionSection && wrestler.championshipTitle && (
              <p className="text-center text-sm sm:text-lg lg:text-xl text-yellow-400 uppercase p-1">
                <strong className="font-bold">{wrestler.championshipTitle}</strong>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
