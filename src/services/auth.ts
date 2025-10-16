import { getLeagueById } from "./leagues";

export const checkLeagueMembership = async (
  userId: number,
  leagueId: number
): Promise<boolean> => {
  const league = await getLeagueById(Number(leagueId));

  if (!league) return false;

  return league.users.includes(userId);
};
