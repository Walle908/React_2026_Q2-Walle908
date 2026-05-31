import { initialPage, SearchParams } from '@/constants/constants';
import { type ApiData, type Character } from '@/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrlChar = 'https://rickandmortyapi.com/api/character';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseUrlChar }),
  endpoints: (build) => ({
    getCharById: build.query<Character, string>({
      query: (id) => `/${id}`,
    }),

    getChars: build.query<ApiData, { page: number; query: string; }>({
      query: ({ page, query }) => {
        const params = new URLSearchParams();

        if (query.trim()) {
          params.append(SearchParams.NAME, query.trim());
        }
        if (page > initialPage || !query.trim()) {
          params.append(SearchParams.PAGE, String(page));
        }

        return `/?${params.toString()}`;
      },
    }),
  }),
  reducerPath: 'apiSlice',
});

export const { useGetCharByIdQuery, useGetCharsQuery } = apiSlice;
