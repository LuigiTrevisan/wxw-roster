export const WrestlerCard = ({ wrestler, isChampionSection, isRosterCard }) => {
    const cardHeight = isRosterCard ? '400px' : '500px'; // Smaller height for roster cards
    const cardWidth = isRosterCard ? '300px' : '365px'; // Smaller width for roster cards

    return (
        <div className="p-2">
            {isChampionSection && wrestler.championshipTitle && (
                <p className="text-center text-xl text-yellow-400 uppercase p-1">
                    <strong className="font-bold">{wrestler.championshipTitle}</strong>
                </p>
            )}
            <div className="bg-gradient-to-b from-[#454545] to-[#757575] overflow-hidden border-4 border-[#c7c7c7]">
                <div className="relative">
                    <img
                        src={wrestler.image}
                        alt={wrestler.name}
                        className="w-full h-full object-cover transition-transform hover:scale-110"
                        style={{ height: cardHeight, width: cardWidth }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-3">
                        <h1 className="text-center font-bold text-3xl text-white">{wrestler.name}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};
