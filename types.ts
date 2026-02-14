export interface SceneProps {
  isActive: boolean;
}

export enum SoundEffect {
  TYPEWRITER = 'typewriter',
  STARTUP = 'startup',
  STAMP = 'stamp',
  ERROR = 'error',
}

export interface CityCheckpoint {
  name: string;
  x: number;
  y: number;
  image: string;
}