
import type { Service, DifficultyLevel } from './types';

export const SERVICES: Service[] = [
  { id: 'ringan', name: 'Servis Ringan', price: 75000 },
  { id: 'lengkap', name: 'Servis Lengkap', price: 150000 },
  { id: 'turun-mesin', name: 'Servis Turun Mesin (Setengah)', price: 500000 },
  { id: 'cvt', name: 'Servis CVT Matic', price: 85000 },
  { id: 'injeksi', name: 'Servis Injeksi', price: 120000 },
];

export const DIFFICULTY_LEVELS: DifficultyLevel[] = [
  { id: 'mudah', name: 'Mudah / Tanpa Kesulitan', multiplier: 0 },
  { id: 'sedang', name: 'Sedang', multiplier: 0.15 },
  { id: 'sulit', name: 'Sulit', multiplier: 0.30 },
  { id: 'sangat-sulit', name: 'Sangat Sulit / Custom', multiplier: 0.50 },
];
