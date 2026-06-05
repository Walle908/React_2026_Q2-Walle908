import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ErrorMessage } from '@/constants/constants';
import { type SerializedError } from '@reduxjs/toolkit';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';
import getErrorMessage from './getErrorMessage';

describe('getErrorMessage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return NO_ERROR when no error', () => {
    expect(getErrorMessage(undefined)).toBe(ErrorMessage.NO_ERROR);
  });

  it('should return NETWORK_ERROR when navigator.onLine is false', () => {
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: false,
    });

    const mockError: FetchBaseQueryError = { data: null, status: 500 };
    expect(getErrorMessage(mockError)).toBe(ErrorMessage.NETWORK_ERROR);
  });

  describe('FetchBaseQueryError', () => {
    it('should return CHAR_NOT_FOUND while 404 when ID searching', () => {
      const mockError: FetchBaseQueryError = {
        data: { error: 'Character not found' },
        status: 404,
      };
      expect(getErrorMessage(mockError)).toBe(ErrorMessage.CHAR_NOT_FOUND);
    });

    it('should return NOT_FOUND while 404 when name seaching', () => {
      const mockError: FetchBaseQueryError = {
        data: { error: 'There is nothing here' },
        status: 404,
      };
      expect(getErrorMessage(mockError)).toBe(ErrorMessage.NOT_FOUND);
    });

    it('should return TOO_MANY_REQUESTS when 429 or FETCH_ERROR', () => {
      const error429: FetchBaseQueryError = { data: null, status: 429 };
      const errorFetch: FetchBaseQueryError = { error: 'error', status: 'FETCH_ERROR' };

      expect(getErrorMessage(error429)).toBe(ErrorMessage.TOO_MANY_REQUESTS);
      expect(getErrorMessage(errorFetch)).toBe(ErrorMessage.TOO_MANY_REQUESTS);
    });

    it('should return SERVER_ERROR when 500 and above', () => {
      const error500: FetchBaseQueryError = { data: null, status: 500 };
      const error503: FetchBaseQueryError = { data: null, status: 503 };

      expect(getErrorMessage(error500)).toBe(ErrorMessage.SERVER_ERROR);
      expect(getErrorMessage(error503)).toBe(ErrorMessage.SERVER_ERROR);
    });
  });

  describe('SerializedError', () => {
    it('should return NETWORK_ERROR when "Network Error"', () => {
      const mockError: SerializedError = { message: 'Network Error' };
      expect(getErrorMessage(mockError)).toBe(ErrorMessage.NETWORK_ERROR);
    });

    it('should return NETWORK_ERROR when "TimeoutError"', () => {
      const mockError: SerializedError = { message: 'Failed', name: 'TimeoutError' };
      expect(getErrorMessage(mockError)).toBe(ErrorMessage.NETWORK_ERROR);
    });

    it('should return default SERVER_ERROR when unknown SerializedError', () => {
      const mockError: SerializedError = { message: 'Some weird js error' };
      expect(getErrorMessage(mockError)).toBe(ErrorMessage.SERVER_ERROR);
    });
  });

  it('should return SERVER_ERROR, when unknown error', () => {
    expect(getErrorMessage('String instead of an object')).toBe(ErrorMessage.SERVER_ERROR);
  });
});
