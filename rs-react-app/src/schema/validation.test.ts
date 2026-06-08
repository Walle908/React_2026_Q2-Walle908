import { describe, it, expect } from 'vitest';
import { validationSchema } from './validation';

const createMockFile = (name: string, size: number, type: string): File => {
  const file = new File([''], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

const getValidData = () => ({
  name: 'Elena',
  age: 25,
  email: 'elena@domain.io',
  password: 'password123',
  confirmPassword: 'password123',
  gender: 'female',
  country: 'Russia',
  terms: true,
  image: createMockFile('avatar.png', 1 * 1024 * 1024, 'image/png'),
});

describe('Validation Schema', () => {
  it('должна успешно валидировать полностью корректные данные', async () => {
    const validData = getValidData();
    const result = await validationSchema.validate(validData);
    expect(result).toBeDefined();
    expect(result.name).toBe('Elena');
  });

  describe('Валидация Имени (Name)', () => {
    it('должна требовать имя', async () => {
      const data = { ...getValidData(), name: '' };
      await expect(validationSchema.validate(data)).rejects.toThrow('Name is required');
    });

    it('должна выдавать ошибку, если первая буква не заглавная', async () => {
      const data = { ...getValidData(), name: 'elena' };
      await expect(validationSchema.validate(data)).rejects.toThrow(
        'Name must start with a capital letter'
      );
    });

    it('должна выдавать ошибку, если имя начинается не с буквы', async () => {
      const data = { ...getValidData(), name: '1elena' };
      await expect(validationSchema.validate(data)).rejects.toThrow(
        'Name must start with a capital letter'
      );
    });
  });

  describe('Валидация Возраста (Age)', () => {
    it('должна требовать возраст', async () => {
      const data = { ...getValidData(), age: '' as unknown as number };
      await expect(validationSchema.validate(data)).rejects.toThrow('Age is required');
    });

    it('должна выдавать ошибку, если введено не число', async () => {
      const data = { ...getValidData(), age: 'not-a-number' as unknown as number };
      await expect(validationSchema.validate(data)).rejects.toThrow('Age must be a number');
    });

    it('должна запрещать отрицательный возраст', async () => {
      const data = { ...getValidData(), age: -5 };
      await expect(validationSchema.validate(data)).rejects.toThrow(
        'Age must be a positive number'
      );
    });
  });

  describe('Валидация Email (без regex)', () => {
    it('должен требовать email', async () => {
      const data = { ...getValidData(), email: '' };
      await expect(validationSchema.validate(data)).rejects.toThrow('Email is required');
    });

    it('должен ругаться, если нет знака @', async () => {
      const data = { ...getValidData(), email: 'elenadomain.io' };
      await expect(validationSchema.validate(data)).rejects.toThrow('Invalid email address');
    });

    it('должен ругаться, если знаков @ больше одного', async () => {
      const data = { ...getValidData(), email: 'elena@@domain.io' };
      await expect(validationSchema.validate(data)).rejects.toThrow('Invalid email address');
    });

    it('должен ругаться, если локальная часть пустая', async () => {
      const data = { ...getValidData(), email: '@domain.io' };
      await expect(validationSchema.validate(data)).rejects.toThrow('Invalid email address');
    });

    it('должен ругаться, если в домене нет точки', async () => {
      const data = { ...getValidData(), email: 'elena@domain' };
      await expect(validationSchema.validate(data)).rejects.toThrow('Invalid email address');
    });

    it('должен ругаться, если домен начинается или заканчивается на точку', async () => {
      const dataStart = { ...getValidData(), email: 'elena@.domain.io' };
      const dataEnd = { ...getValidData(), email: 'elena@domain.' };
      await expect(validationSchema.validate(dataStart)).rejects.toThrow('Invalid email address');
      await expect(validationSchema.validate(dataEnd)).rejects.toThrow('Invalid email address');
    });
  });

  describe('Валидация Паролей', () => {
    it('должен требовать пароль', async () => {
      await expect(validationSchema.validateAt('password', { password: '' })).rejects.toThrow(
        'Password is required'
      );
    });

    it('должен требовать подтверждение пароля', async () => {
      await expect(
        validationSchema.validateAt('confirmPassword', {
          password: '',
          confirmPassword: '',
        })
      ).rejects.toThrow('Confirm password is required');
    });

    it('пароли должны совпадать', async () => {
      const data = { ...getValidData(), confirmPassword: 'differentPassword' };
      await expect(validationSchema.validate(data)).rejects.toThrow('Passwords must match');
    });
  });

  describe('Валидация Опций (Страна, Гендер, Правила)', () => {
    it('должен требовать выбор гендера', async () => {
      const data = { ...getValidData(), gender: '' };
      await expect(validationSchema.validate(data)).rejects.toThrow('Please select your gender');
    });

    it('должен требовать выбор страны', async () => {
      const data = { ...getValidData(), country: '' };
      await expect(validationSchema.validate(data)).rejects.toThrow('Country is required');
    });

    it('должен ругаться на несуществующую страну', async () => {
      const data = { ...getValidData(), country: 'Atlantis' };
      await expect(validationSchema.validate(data)).rejects.toThrow(
        'Selected country is not allowed'
      );
    });

    it('обязан требовать согласие с правилами', async () => {
      const data = { ...getValidData(), terms: false };
      await expect(validationSchema.validate(data)).rejects.toThrow(
        'You must accept terms and conditions'
      );
    });
  });

  describe('Валидация Изображения (Image)', () => {
    it('должен ругаться на отсутствие файла', async () => {
      const data = { ...getValidData(), image: undefined as unknown as File };
      await expect(validationSchema.validate(data)).rejects.toThrow('Image is required');
    });

    it('должен ругаться, если имя файла пустое', async () => {
      const data = { ...getValidData(), image: createMockFile('', 100, 'image/png') };
      await expect(validationSchema.validate(data)).rejects.toThrow('Image is required');
    });

    it('должен ругаться на слишком большой файл (больше 2MB)', async () => {
      const data = {
        ...getValidData(),
        image: createMockFile('big.png', 3 * 1024 * 1024, 'image/png'),
      };
      await expect(validationSchema.validate(data)).rejects.toThrow('File too large (max 2MB)');
    });

    it('должен ругаться на неподдерживаемый формат', async () => {
      const data = {
        ...getValidData(),
        image: createMockFile('document.pdf', 500, 'application/pdf'),
      };
      await expect(validationSchema.validate(data)).rejects.toThrow(
        'Unsupported file format (PNG/JPEG only)'
      );
    });

    it('должен поддерживать валидацию, если передан объект FileList', async () => {
      const file = createMockFile('avatar.jpg', 1024, 'image/jpeg');
      const mockFileList = {
        0: file,
        length: 1,
        item: (index: number) => (index === 0 ? file : null),
      };

      class DummyFileList {
        public length = 0;
      }
      Object.defineProperty(globalThis, 'FileList', { value: DummyFileList, configurable: true });

      Object.setPrototypeOf(mockFileList, DummyFileList.prototype);

      const data = { ...getValidData(), image: mockFileList as unknown as FileList };
      const result = await validationSchema.validate(data);
      expect(result).toBeDefined();
    });
  });
});
