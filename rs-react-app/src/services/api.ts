import { ErrorMessage, initialPage, SearchParams } from '@/constants/constants';
import { type Character, type CharsResponse, type Result } from '@/types/types';

const baseUrl = 'https://rickandmortyapi.com/api/character';

export async function getChars(
  query: string = '',
  page: number = initialPage
): Promise<Result<CharsResponse>> {
  try {
    const params = new URLSearchParams();

    if (query.trim()) {
      params.append(SearchParams.NAME, query.trim());
    }
    if (page > initialPage || !query.trim()) {
      params.append(SearchParams.PAGE, String(page));
    }

    const url = `${baseUrl}/?${params.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      return {
        data: null,
        error: `HTTP_${response.status}`,
      };
    }

    const json = await response.json();

    return {
      data: {
        pages: json.info?.pages ?? 0,
        results: json.results ?? [],
      },
      error: null,
    };
  } catch {
    return {
      data: null,
      error: ErrorMessage.NETWORK_ERROR,
    };
  }
}

export async function getOneChar(id: string): Promise<Result<Character>> {
  try {
    const url = baseUrl + `/${id}`;

    const response = await fetch(url);

    if (!response.ok) {
      return {
        data: null,
        error: `HTTP_${response.status}`,
      };
    }

    const json = await response.json();

    return {
      data: json,
      error: null,
    };
  } catch {
    return {
      data: null,
      error: ErrorMessage.NETWORK_ERROR,
    };
  }
}
