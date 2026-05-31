import { type Character } from '@/types/types';

export const mockCharacter: Character = {
  created: '2017-11-04T21:12:45.235Z',
  episode: ['https://rickandmortyapi.com/api/episode/15'],
  gender: 'Male',
  id: 16,
  image: 'https://rickandmortyapi.com/api/character/avatar/16.jpeg',
  location: {
    name: 'Earth (Replacement Dimension)',
    url: 'https://rickandmortyapi.com/api/location/20',
  },
  name: 'Amish Cyborg',
  origin: {
    name: 'unknown',
    url: '',
  },
  species: 'Alien',
  status: 'Dead',
  type: 'Parasite',
  url: 'https://rickandmortyapi.com/api/character/16',
};

export const emptyMockCharacter: Character = {
  created: '2017-11-04T18:48:46.250Z',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  gender: '',
  id: 1,
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  location: { name: '', url: '' },
  name: 'n/a',
  origin: { name: '', url: '' },
  species: '',
  status: '',
  type: '',
  url: 'https://rickandmortyapi.com/api/character/1',
};

export const mockCharacters: Character[] = [
  {
    created: '2017-11-04T18:48:46.250Z',
    episode: ['https://rickandmortyapi.com/api/episode/1'],
    gender: 'Male',
    id: 1,
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
    name: 'Rick Sanchez',
    origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
    species: 'Human',
    status: 'Alive',
    type: '',
    url: 'https://rickandmortyapi.com/api/character/1',
  },
  {
    created: '2017-11-04T18:50:21.651Z',
    episode: ['https://rickandmortyapi.com/api/episode/1'],
    gender: 'Male',
    id: 2,
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
    name: 'Morty Smith',
    origin: { name: 'unknown', url: '' },
    species: 'Human',
    status: 'Alive',
    type: '',
    url: 'https://rickandmortyapi.com/api/character/2',
  },
];
