import React, { useState } from 'react';
import { Clock, Filter } from 'lucide-react';
import { Match, Player } from '../types';

interface MatchHistoryProps {
  matches: Match[];
  getPlayerName: (id: string) => string;
  players?: Player[];
}

export function MatchHistory({ matches, getPlayerName }: MatchHistoryProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('');

  // Get unique player IDs from matches
  const uniquePlayerIds = Array.from(new Set(
    matches.flatMap(match => [match.player1Id, match.player2Id])
  ));

  // Filter matches based on selected player
  const filteredMatches = selectedPlayerId
    ? matches.filter(match => 
        match.player1Id === selectedPlayerId || 
        match.player2Id === selectedPlayerId
      )
    : matches;

  const sortedMatches = [...filteredMatches].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="w-full max-w-4xl">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Clock className="h-6 w-6" />
            Match History
          </h2>
        </div>

        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={selectedPlayerId}
              onChange={(e) => setSelectedPlayerId(e.target.value)}
              className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="">All Players</option>
              {uniquePlayerIds.map((playerId) => (
                <option key={playerId} value={playerId}>
                  {getPlayerName(playerId)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {sortedMatches.length > 0 ? (
            sortedMatches.map((match) => (
              <div key={match.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold ${
                        match.player1Id === selectedPlayerId ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {getPlayerName(match.player1Id)}
                      </span>
                      <span className="mx-4 text-lg font-bold">
                        {match.player1Score} - {match.player2Score}
                      </span>
                      <span className={`font-semibold ${
                        match.player2Id === selectedPlayerId ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {getPlayerName(match.player2Id)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <span className={`text-sm font-medium ${
                      match.eloChange > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {match.eloChange > 0 ? '+' : ''}{match.eloChange} ELO
                    </span>
                    <p className="text-xs text-gray-500">
                      {new Date(match.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-gray-500">
              {selectedPlayerId ? 'No matches found for this player' : 'No matches recorded yet'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}