export interface Player {
  id: string;
  name: string;
  eloRating: number;
  matchesPlayed: number;
  wins: number;
  losses: number;
}

export interface Match {
  id: string;
  player1Id: string;
  player2Id: string;
  player1Score: number;
  player2Score: number;
  date: string;
  eloChange: number;
}