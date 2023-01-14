export interface Celestial {
  name: string;
  about: string;
  distance: string;
  time: string;
  deg: string;
}

export interface CelestialList {
  moon: Celestial;
  mars: Celestial;
  europa: Celestial;
  titan: Celestial;
}

export type CelestialListKey = 'moon' | 'mars' | 'europa' | 'titan';

export type CelestialKey = 'name' | 'about' | 'distance' | 'time' | 'deg';

export type LoopableKey = 'name' | 'distance' | 'time';

export type IntervalKey = 'nameInterval' | 'distanceInterval' | 'timeInterval';
