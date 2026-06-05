import { initialPage, SearchParams } from '@/constants/constants';
import { type ApiData, type Character } from '@/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrlChar = 'https://rickandmortyapi.com/api/character';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseUrlChar }),
  endpoints: (build) => ({
    getCharById: build.query<Character, string>({
      providesTags: (_result, _error, id) => [{ id, type: 'Character' }],
      query: (id) => `/${id}`,
    }),

    getChars: build.query<ApiData, { page: number; query: string }>({
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                id,
                type: 'Character' as const,
              })),
              { id: 'LIST', type: 'Character' },
            ]
          : [{ id: 'LIST', type: 'Character' }],
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

  keepUnusedDataFor: Number(import.meta.env.VITE_CACHE_TTL) || 60,
  reducerPath: 'apiSlice',
  tagTypes: ['Character'],
});

export const { useGetCharByIdQuery, useGetCharsQuery } = apiSlice;
