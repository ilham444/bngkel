
export interface Service {
  id: string;
  name: string;
  price: number;
}

export interface SparePart {
  id: number;
  name: string;
  price: number;
}

export interface DifficultyLevel {
  id: string;
  name: string;
  multiplier: number;
}
