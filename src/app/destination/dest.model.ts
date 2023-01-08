export interface Celestial {
  name: string;
  about: string;
  distance: number;
  time: number;
  deg: number;
}

export interface CelestialList {
  moon: Celestial;
  mars: Celestial;
  europa: Celestial;
  titan: Celestial;
}
