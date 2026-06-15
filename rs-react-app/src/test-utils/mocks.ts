import { type FormDataPayload } from '@/store/formSlice';

export const mockPayload: FormDataPayload = {
  id: 'test-id-123',
  name: 'Nick',
  age: 25,
  email: 'nick@domain.io',
  password: 'securePassword123',
  gender: 'male',
  country: 'Spain',
  image: 'data:image/png;base64,mockData',
  terms: true,
};

export const mockPayloads = [
  {
    id: 'id-1',
    name: 'Elena',
    age: 25,
    gender: 'female',
    email: 'elena@domain.io',
    password: 'securePassword123',
    country: 'Russia',
    image: 'data:image/png;base64,mock1',
    terms: true,
  },

  {
    id: 'id-2',
    name: 'Ivan',
    age: 30,
    gender: 'male',
    email: 'ivan@domain.io',
    password: 'securePassword123',
    country: 'Serbia',
    image: 'data:image/png;base64,mock2',
    terms: true,
  },
];
