import { ErrorMessage } from '@/constants/constants';
import { type SerializedError } from '@reduxjs/toolkit';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';

export default function getErrorMessage(error: unknown): ErrorMessage {
  if (!error) return ErrorMessage.NO_ERROR;

  if (typeof window !== 'undefined' && !navigator.onLine) {
    return ErrorMessage.NETWORK_ERROR;
  }

  if (typeof error === 'object' && error !== null) {
    if ('status' in error) {
      const { data, status } = error as FetchBaseQueryError;

      if (status === 404) {
        const apiData = data as { error: string };

        if (apiData.error === 'Character not found') {
          return ErrorMessage.CHAR_NOT_FOUND;
        }
        return ErrorMessage.NOT_FOUND;
      }

      if (status === 429 || status === 'FETCH_ERROR') {
        return ErrorMessage.TOO_MANY_REQUESTS;
      }

      if (typeof status === 'number' && status >= 500) {
        return ErrorMessage.SERVER_ERROR;
      }
    }

    if ('message' in error) {
      const { message, name } = error as SerializedError;
      if (message === 'Network Error' || name === 'TimeoutError') {
        return ErrorMessage.NETWORK_ERROR;
      }
    }
  }
  return ErrorMessage.SERVER_ERROR;
}
