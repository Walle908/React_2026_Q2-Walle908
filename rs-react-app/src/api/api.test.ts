import { afterEach, beforeEach, describe, expect, it, type MockInstance, vi } from 'vitest';
import { getChars, getOneChar } from './api';

describe('getChars API Function', () => {
  let fetchSpy: MockInstance;

  beforeEach(() => {
    fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockImplementation(() => Promise.resolve(new Response()));
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it('should fetch the default first page when no search query is provided', async () => {
    const mockApiResponse = {
      info: { pages: 42 },
      results: [{ id: 1, name: 'Rick Sanchez' }],
    };

    fetchSpy.mockResolvedValueOnce(
      new Response(JSON.stringify(mockApiResponse), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    );

    const result = await getChars();

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?page=1',
      expect.any(Object)
    );

    expect(result).toEqual({ pages: 42, results: mockApiResponse.results });
  });

  it('should fetch by name parameter when a query string is provided', async () => {
    const mockApiResponse = {
      info: { pages: 4 },
      results: [{ id: 2, name: 'Morty Smith' }],
    };

    fetchSpy.mockResolvedValueOnce(
      new Response(JSON.stringify(mockApiResponse), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    );

    const result = await getChars('Morty Smith');

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?name=Morty+Smith',
      expect.any(Object)
    );
    expect(result).toEqual({ pages: 4, results: mockApiResponse.results });
  });

  it('should return an empty array if server returns 404 Status (Not Found)', async () => {
    fetchSpy.mockResolvedValueOnce(
      new Response(JSON.stringify({ error: 'There is nothing here' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 404,
      })
    );

    const result = await getChars('NonExistentCharacter');

    expect(result).toEqual(null);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw an explicit server error if response status is not ok (e.g. 500)', async () => {
    fetchSpy.mockResolvedValueOnce(
      new Response(null, {
        status: 500,
        statusText: 'Internal Server Error',
      })
    );

    await expect(getChars('Rick')).rejects.toThrow('Server error while requesting data');
  });

  it('should return an empty array if results property is missing in response data', async () => {
    fetchSpy.mockResolvedValueOnce(
      new Response(JSON.stringify({}), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    );

    const result = await getChars('Rick');

    expect(result).toEqual({ pages: 0, results: [] });
  });

  describe('getOneChar API Function', () => {
    it('should fetch single character data successfully by ID', async () => {
      const mockCharResponse = {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
      };

      fetchSpy.mockResolvedValueOnce(
        new Response(JSON.stringify(mockCharResponse), {
          headers: { 'Content-Type': 'application/json' },
          status: 200,
        })
      );

      const result = await getOneChar('1');

      expect(fetchSpy).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1');
      expect(result).toEqual(mockCharResponse);
    });

    it('should return null if server returns 404 Status (Not Found) for character ID', async () => {
      fetchSpy.mockResolvedValueOnce(
        new Response(JSON.stringify({ error: 'Character not found' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 404,
        })
      );

      const result = await getOneChar('99999');

      expect(result).toBeNull();
      expect(fetchSpy).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/99999');
    });

    it('should throw an explicit server error if response status is not ok (e.g. 500) for single character request', async () => {
      fetchSpy.mockResolvedValueOnce(
        new Response(null, {
          status: 500,
          statusText: 'Internal Server Error',
        })
      );

      await expect(getOneChar('1')).rejects.toThrow('Server error while requesting data');
    });
  });
});
