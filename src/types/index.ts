export interface User {
  id: number;
  name: string;
  leagues: number[];
  teams: number[];
}

export interface League {
  id: number;
  name: string;
  users: number[];
  teams: number[];
  standings: Record<string, { wins: number, losses: number, draws: number }>;
}

export interface Team {
  id: number;
  name: string;
  owner: number;
  pros: number[];
}

export interface Tournament {
  id: number;
  name: string;
  participants: number[]
}

export interface Pro {
  id: number;
  name: string;
  cost: number;
}

export interface AuthContextType {
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}
