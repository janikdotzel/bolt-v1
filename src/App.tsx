import React, { useState } from 'react';
import { Player, Match } from './types';
import { calculateEloRating } from './utils/elo';
import { PlayerList } from './components/PlayerList';
import { MatchHistory } from './components/MatchHistory';
import { MatchForm } from './components/MatchForm';
import { TabNavigation } from './components/TabNavigation';

// Initial demo data
const initialPlayers: Player[] = [
  {
    id: '1',
    name: 'Alice',
    eloRating: 1500,
    matchesPlayed: 0,
    wins: 0,
    losses: 0,
  },
  {
    id: '2',
    name: 'Bob',
    eloRating: 1500,
    matchesPlayed: 0,
    wins: 0,
    losses: 0,
  },
  {
    id: '3',
    name: 'Charlie',
    eloRating: 1500,
    matchesPlayed: 0,
    wins: 0,
    losses: 0,
  },
];

function App() {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeTab, setActiveTab] = useState('rankings');

  const handleMatchSubmit = (
    player1Id: string,
    player2Id: string,
    player1Score: number,
    player2Score: number
  ) => {
    const player1 = players.find((p) => p.id === player1Id)!;
    const player2 = players.find((p) => p.id === player2Id)!;

    const player1Won = player1Score > player2Score;
    const newPlayer1Rating = calculateEloRating(
      player1.eloRating,
      player2.eloRating,
      player1Won
    );
    const newPlayer2Rating = calculateEloRating(
      player2.eloRating,
      player1.eloRating,
      !player1Won
    );

    const eloChange = newPlayer1Rating - player1.eloRating;

    const newMatch: Match = {
      id: Date.now().toString(),
      player1Id,
      player2Id,
      player1Score,
      player2Score,
      date: new Date().toISOString(),
      eloChange,
    };

    setMatches([newMatch, ...matches]);
    setPlayers(
      players.map((p) => {
        if (p.id === player1Id) {
          return {
            ...p,
            eloRating: newPlayer1Rating,
            matchesPlayed: p.matchesPlayed + 1,
            wins: player1Won ? p.wins + 1 : p.wins,
            losses: !player1Won ? p.losses + 1 : p.losses,
          };
        }
        if (p.id === player2Id) {
          return {
            ...p,
            eloRating: newPlayer2Rating,
            matchesPlayed: p.matchesPlayed + 1,
            wins: !player1Won ? p.wins + 1 : p.wins,
            losses: player1Won ? p.losses + 1 : p.losses,
          };
        }
        return p;
      })
    );

    // Switch to history tab after submitting a match
    setActiveTab('history');
  };

  const getPlayerName = (id: string) => {
    return players.find((p) => p.id === id)?.name || 'Unknown Player';
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'rankings':
        return <PlayerList players={players} />;
      case 'record':
        return <MatchForm players={players} onSubmit={handleMatchSubmit} />;
      case 'history':
        return <MatchHistory matches={matches} getPlayerName={getPlayerName} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Rankify</h1>
          <p className="text-gray-600">
            Track your Elo rating and compete with others
          </p>
        </header>

        <div className="flex justify-center mb-8">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="flex justify-center px-4 sm:px-0">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
}

export default App;
