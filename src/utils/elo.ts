const K_FACTOR = 32;

export const calculateEloRating = (
  playerRating: number,
  opponentRating: number,
  playerWon: boolean
): number => {
  const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
  const actualScore = playerWon ? 1 : 0;
  return Math.round(playerRating + K_FACTOR * (actualScore - expectedScore));
};