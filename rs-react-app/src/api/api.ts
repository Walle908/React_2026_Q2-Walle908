import { type Character, type CharsResponse } from '../types/types';
import { initialPage, SearchParams } from '../constants/constants';

const baseUrl = 'https://rickandmortyapi.com/api/character';

export async function getChars(
  query: string = '',
  page: number = initialPage,
  signal?: AbortSignal
): Promise<CharsResponse | null> {
  const params = new URLSearchParams();

  if (query.trim()) {
    params.append(SearchParams.NAME, query.trim());
  }
  if (page > initialPage || !query.trim()) {
    params.append(SearchParams.PAGE, String(page));
  }

  const url = `${baseUrl}/?${params.toString()}`;

  const response = await fetch(url, { signal });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Server error while requesting data');
  }

  const data = await response.json();
  return { results: data.results || [], pages: data.info?.pages || 0 };
}

export async function getOneChar(id: string): Promise<Character | null> {
  const url = baseUrl + `/${id}`;

  const response = await fetch(url);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Server error while requesting data');
  }

  const data = await response.json();

  return data;
}
