import React, { useState } from 'react';
import { Swords } from 'lucide-react';
import { Player } from '../types';

interface MatchFormProps {
  players: Player[];
  onSubmit: (player1Id: string, player2Id: string, player1Score: number, player2Score: number) => void;
}

export function MatchForm({ players, onSubmit }: MatchFormProps) {
  const [player1Id, setPlayer1Id] = useState('');
  const [player2Id, setPlayer2Id] = useState('');
  const [player1Score, setPlayer1Score] = useState('');
  const [player2Score, setPlayer2Score] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (player1Id && player2Id && player1Score && player2Score) {
      onSubmit(
        player1Id,
        player2Id,
        parseInt(player1Score),
        parseInt(player2Score)
      );
      setPlayer1Id('');
      setPlayer2Id('');
      setPlayer1Score('');
      setPlayer2Score('');
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-green-600 to-teal-600">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Swords className="h-6 w-6" />
            Submit Match Result
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700">Player 1</span>
                <select
                  value={player1Id}
                  onChange={(e) => setPlayer1Id(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                >
                  <option value="">Select player</option>
                  {players.map((player) => (
                    <option key={player.id} value={player.id}>
                      {player.name} ({player.eloRating})
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-gray-700">Score</span>
                <input
                  type="number"
                  min="0"
                  value={player1Score}
                  onChange={(e) => setPlayer1Score(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </label>
            </div>
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700">Player 2</span>
                <select
                  value={player2Id}
                  onChange={(e) => setPlayer2Id(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                >
                  <option value="">Select player</option>
                  {players.map((player) => (
                    <option key={player.id} value={player.id}>
                      {player.name} ({player.eloRating})
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-gray-700">Score</span>
                <input
                  type="number"
                  min="0"
                  value={player2Score}
                  onChange={(e) => setPlayer2Score(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Match Result
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}