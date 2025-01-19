import React from 'react';

export const RosterFilters = ({ filters, setFilters }) => {
    return (
        <div className="flex gap-6">
            {/* Gender Filters */}
            <div className="flex gap-4">
                <button
                    onClick={() => setFilters(prev => ({ ...prev, gender: prev.gender === 'male' ? null : 'male' }))}
                    className={`flex items-center px-6 py-3 rounded-md border-2 transition-all duration-300 text-lg font-medium ${filters.gender === 'male'
                        ? 'bg-red-500/20 border-red-500 text-white'
                        : 'bg-gray-900/90 border-gray-700 text-gray-400 hover:border-red-500/50 hover:text-white'
                        }`}
                >
                    <svg className="w-7 h-7 mr-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1888 7L12.1909 5L19.1909 5.00746L19.1834 12.0075L17.1834 12.0053L17.1873 8.41678L14.143 11.4611C15.4612 13.4063 15.2587 16.0743 13.5355 17.7975C11.5829 19.7501 8.41709 19.7501 6.46447 17.7975C4.51184 15.8449 4.51184 12.6791 6.46447 10.7264C8.16216 9.02873 10.777 8.80709 12.7141 10.0615L15.7718 7.00382L12.1888 7ZM7.87868 12.1406C9.05025 10.9691 10.9497 10.9691 12.1213 12.1406C13.2929 13.3122 13.2929 15.2117 12.1213 16.3833C10.9497 17.5549 9.05025 17.5549 7.87868 16.3833C6.70711 15.2117 6.70711 13.3122 7.87868 12.1406Z" fill="currentColor" />
                    </svg>

                    Male
                </button>
                <button
                    onClick={() => setFilters(prev => ({ ...prev, gender: prev.gender === 'female' ? null : 'female' }))}
                    className={`flex items-center px-6 py-3 rounded-md border-2 transition-all duration-300 text-lg font-medium ${filters.gender === 'female'
                        ? 'bg-red-500/20 border-red-500 text-white'
                        : 'bg-gray-900/90 border-gray-700 text-gray-400 hover:border-red-500/50 hover:text-white'
                        }`}
                >
                    <svg className="w-7 h-7 mr-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C9.23858 3 7 5.23858 7 8C7 10.419 8.71776 12.4367 11 12.9V15H8V17H11V21H13V17H16V15H13V12.9C15.2822 12.4367 17 10.419 17 8C17 5.23858 14.7614 3 12 3ZM9 8C9 9.65685 10.3431 11 12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8Z" fill="currentColor" />
                    </svg>
                    Female
                </button>
            </div>
            {/* Division Filter */}
            <button
                onClick={() => setFilters(prev => ({ ...prev, showTagTeams: prev.showTagTeams === true ? false : true }))}
                className={`flex items-center px-6 py-3 rounded-md border-2 transition-all duration-300 text-lg font-medium ${filters.showTagTeams === true
                    ? 'bg-red-500/20 border-red-500 text-white'
                    : 'bg-gray-900/90 border-gray-700 text-gray-400 hover:border-red-500/50 hover:text-white'
                    }`}
            >
                <svg className="w-7 h-7 mr-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z" clipRule="evenodd" />
                </svg>
                Tag Teams
            </button>
        </div>
    );
};

export default RosterFilters;