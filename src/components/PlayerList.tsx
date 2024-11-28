import React from 'react';
import { Trophy } from 'lucide-react';
import { Player } from '../types';

interface PlayerListProps {
  players: Player[];
}

export function PlayerList({ players }: PlayerListProps) {
  const sortedPlayers = [...players].sort((a, b) => b.eloRating - a.eloRating);

  return (
    <div className="w-full max-w-4xl">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="h-5 w-5 sm:h-6 sm:w-6" />
            Player Rankings
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {sortedPlayers.map((player, index) => (
            <div
              key={player.id}
              className="px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <span className={`
                  ${index === 0 ? 'bg-yellow-400' : 
                    index === 1 ? 'bg-gray-300' :
                    index === 2 ? 'bg-amber-600' : 'bg-gray-100'}
                  w-8 h-8 rounded-full flex items-center justify-center font-bold
                  ${index <= 2 ? 'text-white' : 'text-gray-600'}
                `}>
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900">{player.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Matches: {player.matchesPlayed} (W: {player.wins} L: {player.losses})
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-bold text-gray-900">
                  {player.eloRating}
                </span>
                <p className="text-xs sm:text-sm text-gray-500">ELO Rating</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}