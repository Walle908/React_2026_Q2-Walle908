export interface ApiData {
  info: {
    count: number;
    next: null | string;
    pages: number;
    prev: null | string;
  };
  results: Character[];
}

export interface Character {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: { name: string; url: string };
  name: string;
  origin: { name: string; url: string };
  species: string;
  status: string;
  type: string;
  url: string;
}

export interface CharsResponse {
  pages: number;
  results: Character[];
}
