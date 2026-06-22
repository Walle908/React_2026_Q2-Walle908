export const localStorageKey = 'lastSearch_walle908';

export const enum ErrorMessage {
  BOUNDARY_ERROR = 'Something went wrong...',
  CHAR_NOT_FOUND = 'Character not found',
  NETWORK_ERROR = 'Network error. Please check your internet connection.',
  NO_ERROR = '',
  NOT_FOUND = 'No characters found',
  SERVER_ERROR = 'Server error',
  TOO_MANY_REQUESTS = 'Too many requests. Please wait a minute before trying again.',
}

export const initialPage = 1;

export const enum SearchParams {
  DETAILS = 'details',
  NAME = 'name',
  PAGE = 'page',
}

export const Delay = 500;

export const ApiError = {
  HTTP_404: 'HTTP_404',
  HTTP_429: 'HTTP_429',
  HTTP_500: 'HTTP_500',
  HTTP_502: 'HTTP_502',
  HTTP_503: 'HTTP_503',
  NETWORK_ERROR: 'NETWORK_ERROR',
} as const;
