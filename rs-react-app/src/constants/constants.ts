export const localStorageKey = 'lastSearch_walle908';

export const enum ErrorMessage {
  BOUNDARY_ERROR = 'boundaryError',
  NETWORK_ERROR = 'networkError',
  NO_ERROR = 'noError',
  NOT_FOUND = 'notCharsFound',
  SERVER_ERROR = 'serverError',
  TOO_MANY_REQUESTS = 'tooManyRequests',
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
