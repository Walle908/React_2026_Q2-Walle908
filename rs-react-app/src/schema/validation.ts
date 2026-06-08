import * as yup from 'yup';
import COUNTRIES_LIST from '@/constants/countriesList';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const SUPPORTED_FORMATS = ['image/png', 'image/jpeg'];

export const validationSchema = yup.object({
  name: yup
    .string()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required('Name is required')
    .test('capital-letter', 'The first letter must be capitalized', (value) => {
      if (!value) return false;
      const firstChar = value.charAt(0);
      const isLetter = firstChar.toLowerCase() !== firstChar.toUpperCase();
      return isLetter && firstChar === firstChar.toUpperCase();
    }),

  age: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .typeError('Age must be a number')
    .required('Age is required')
    .positive('Negative values are not allowed'),

  email: yup
    .string()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required('Email is required')
    .test('basic-email', 'Invalid email format', (value) => {
      if (!value) return false;
      const parts = value.split('@');
      if (parts.length !== 2) return false;

      const [local, domain] = parts;
      if (!local || !domain) return false;

      if (!local.trim()) return false;

      if (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.')) {
        return false;
      }

      return true;
    }),

  password: yup.string().required('Password is required'),

  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),

  gender: yup.string().required('Please select your gender'),

  country: yup
    .string()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required('Country is required')
    .oneOf(COUNTRIES_LIST, 'Selected country is not allowed'),

  terms: yup
    .boolean()
    .required('You must accept terms and conditions')
    .oneOf([true], 'You must accept terms and conditions'),

  image: yup
    .mixed<FileList>()
    .required('Image is required')
    .test('validate-image', 'Image error', function (value) {
      if (!value) {
        return this.createError({ message: 'Image is required' });
      }

      const file = value instanceof FileList ? value[0] : (value as File);

      if (!file || !file.name || file.name === '') {
        return this.createError({ message: 'Image is required' });
      }

      if (file.size > MAX_IMAGE_SIZE) {
        return this.createError({ message: 'File too large (max 2MB)' });
      }

      if (!SUPPORTED_FORMATS.includes(file.type)) {
        return this.createError({ message: 'Unsupported file format (PNG/JPEG only)' });
      }

      return true;
    }),
});

export type FormValidFields = yup.InferType<typeof validationSchema>;
