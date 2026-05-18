import { type Character } from '../types/types';

const baseUrl = 'https://rickandmortyapi.com/api/character';

export async function getChars(query?: string): Promise<Character[]> {
  const activePage = 1;
  const url = query
    ? `${baseUrl}/?name=${encodeURIComponent(query)}`
    : `${baseUrl}/?page=${activePage}`;

  const response = await fetch(url);

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error('Server error while requesting data');
  }

  const data = await response.json();
  return data.results || [];
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
