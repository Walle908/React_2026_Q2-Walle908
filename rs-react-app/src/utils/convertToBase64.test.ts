import { describe, it, expect, vi } from 'vitest'; // Если используете Jest, замените vi на jest
import convertToBase64 from './convertToBase64';

describe('convertToBase64', () => {
  it('должен успешно конвертировать файл в строку Base64', async () => {
    const file = new File(['hello world'], 'test.txt', { type: 'text/plain' });
    const result = await convertToBase64(file);

    expect(result).toContain('data:text/plain;base64,');
    expect(typeof result).toBe('string');
  });

  it('должен отклонять промис (reject) при возникновении ошибки FileReader', async () => {
    const file = new File([''], 'corrupted.txt');

    class MockFileReader {
      onerror: ((this: FileReader, ev: ProgressEvent<FileReader>) => unknown) | null = null;

      readAsDataURL(): void {
        setTimeout(() => {
          if (this.onerror) {
            const errorEvent = new ProgressEvent('error') as ProgressEvent<FileReader>;
            this.onerror.call(this as unknown as FileReader, errorEvent);
          }
        }, 0);
      }
    }

    vi.stubGlobal('FileReader', MockFileReader);

    await expect(convertToBase64(file)).rejects.toBeDefined();

    vi.unstubAllGlobals();
  });
});
