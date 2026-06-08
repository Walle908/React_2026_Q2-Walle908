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
