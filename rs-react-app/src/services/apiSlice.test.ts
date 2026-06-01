import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { initialPage } from '@/constants/constants';
import { mockCharacter } from '@/test-utils/mocks';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

const mockApiData = {
  info: { count: 1, next: null, pages: 3, prev: null },
  results: [mockCharacter],
};

describe('apiSlice', () => {
  const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
  });

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    store.dispatch(apiSlice.util.resetApiState());
    vi.unstubAllGlobals();
  });

  describe('getCharById', () => {
    it('should successfully fetch single character and map id tags', async () => {
      const mockResponse = new Response(JSON.stringify(mockCharacter), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse);

      const action = store.dispatch(apiSlice.endpoints.getCharById.initiate('16'));
      const result = await action;

      expect(result.status).toBe('fulfilled');
      expect(result.data).toEqual(mockCharacter);

      const firstCallRequest = vi.mocked(fetch).mock.calls[0]?.[0] as Request;
      expect(firstCallRequest.url).toContain('/16');
    });
  });

  describe('getChars', () => {
    it('should fetch character list with query and page params', async () => {
      const mockResponse = new Response(JSON.stringify(mockApiData), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse);

      const action = store.dispatch(
        apiSlice.endpoints.getChars.initiate({ page: 2, query: 'Rick' })
      );
      const result = await action;

      expect(result.status).toBe('fulfilled');
      expect(result.data).toEqual(mockApiData);

      const firstCallRequest = vi.mocked(fetch).mock.calls[0]?.[0] as Request;
      expect(firstCallRequest.url).toContain('name=Rick');
      expect(firstCallRequest.url).toContain('page=2');
    });

    it('should fetch list with empty query and handle fallback page parameter', async () => {
      const mockResponse = new Response(JSON.stringify(mockApiData), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse);

      const action = store.dispatch(
        apiSlice.endpoints.getChars.initiate({ page: initialPage, query: '' })
      );
      const result = await action;

      expect(result.status).toBe('fulfilled');
    });

    it('should process alternative providesTags path when API returns error response', async () => {
      const mockResponse = new Response(JSON.stringify({ error: 'Not Found' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 404,
      });
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse);

      const action = store.dispatch(
        apiSlice.endpoints.getChars.initiate({ page: 1, query: 'NonExistent' })
      );
      const result = await action;

      expect(result.status).toBe('rejected');
    });
  });
});
