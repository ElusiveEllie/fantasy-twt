import leaguesData from "../data/leagues";

export const getLeagueById = async (id: number) => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
  return leaguesData.find((league) => league.id === id) || null;
};
