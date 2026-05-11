import { type Character } from '../types/types';

export const mockCharacter: Character = {
  id: 16,
  name: 'Amish Cyborg',
  status: 'Dead',
  species: 'Alien',
  type: 'Parasite',
  gender: 'Male',
  origin: {
    name: 'unknown',
    url: '',
  },
  location: {
    name: 'Earth (Replacement Dimension)',
    url: 'https://rickandmortyapi.com/api/location/20',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/16.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/15'],
  url: 'https://rickandmortyapi.com/api/character/16',
  created: '2017-11-04T21:12:45.235Z',
};

export const emptyMockCharacter = {
  id: 1,
  name: '',
  status: '',
  species: '',
  type: '',
  gender: '',
  origin: { name: '', url: '' },
  location: { name: '', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
};
