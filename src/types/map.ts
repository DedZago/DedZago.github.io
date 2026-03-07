export interface LocationPin {
  id: string;
  type: 'presentation' | 'education' | 'work';
  title: string;
  date: string;
  location: string;
  coordinates: [number, number]; // [longitude, latitude]
  contentId: string;
  venue?: string;
  institution?: string;
  company?: string;
}

export type PinType = 'presentation' | 'education' | 'work';

export interface LocationMap {
  flyTo: (lng: number, lat: number, zoom?: number) => void;
  highlightPin: (pinId: string) => void;
}

declare global {
  interface Window {
    locationMap?: LocationMap;
    mapPins?: LocationPin[];
  }
}
