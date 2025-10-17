import type { League } from "../types";

const leagues: League[] = [
  {
    id: 1,
    name: "Tekken World Tour",
    teams: [1, 2, 3, 4, 5, 6, 7, 8],
    users: [1, 2, 3, 4, 5, 6, 7, 8],
    standings: {
      "1": { wins: 6, draws: 1, losses: 0 },
      "2": { wins: 4, draws: 2, losses: 1 },
      "3": { wins: 4, draws: 1, losses: 2 },
      "4": { wins: 3, draws: 3, losses: 1 },
      "5": { wins: 1, draws: 3, losses: 3 },
      "6": { wins: 2, draws: 1, losses: 4 },
      "7": { wins: 1, draws: 2, losses: 4 },
      "8": { wins: 0, draws: 1, losses: 6 },
    },
  },
  {
    id: 2,
    name: "Street Fighter Legends League",
    teams: [9, 10, 11, 12],
    users: [1, 2, 3, 4],
    standings: {
      "9": { wins: 6, draws: 0, losses: 0 },
      "10": { wins: 4, draws: 2, losses: 0 },
      "11": { wins: 0, draws: 2, losses: 4 },
      "12": { wins: 0, draws: 0, losses: 6 },
    },
  },
  {
    id: 3,
    name: "Guilty Gear Champions Circuit",
    teams: [13, 14, 15, 16],
    users: [5, 6, 7, 8],
    standings: {
      "13": { wins: 6, draws: 0, losses: 0 },
      "14": { wins: 4, draws: 2, losses: 0 },
      "15": { wins: 0, draws: 2, losses: 4 },
      "16": { wins: 0, draws: 0, losses: 6 },
    },
  },
];

export default leagues;
