import { describe, it, expect, vi, beforeEach, afterEach, type MockInstance } from 'vitest';
import { getChars } from './api';

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
      results: [{ id: 1, name: 'Rick Sanchez' }],
    };

    fetchSpy.mockResolvedValueOnce(
      new Response(JSON.stringify(mockApiResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const result = await getChars();

    expect(fetchSpy).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/?page=1');
    expect(result).toEqual(mockApiResponse.results);
  });

  it('should fetch by name parameter when a query string is provided', async () => {
    const mockApiResponse = {
      results: [{ id: 2, name: 'Morty Smith' }],
    };

    fetchSpy.mockResolvedValueOnce(
      new Response(JSON.stringify(mockApiResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const result = await getChars('Morty Smith');

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?name=Morty%20Smith'
    );
    expect(result).toEqual(mockApiResponse.results);
  });

  it('should return an empty array if server returns 404 Status (Not Found)', async () => {
    fetchSpy.mockResolvedValueOnce(
      new Response(JSON.stringify({ error: 'There is nothing here' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const result = await getChars('NonExistentCharacter');

    expect(result).toEqual([]);
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
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const result = await getChars('Rick');

    expect(result).toEqual([]);
  });
});
