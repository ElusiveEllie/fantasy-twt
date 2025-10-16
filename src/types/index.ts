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
}

export interface Team {
  id: number;
  name: string;
  owner: number;
  pros: number[];
}

export interface AuthContextType {
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}
