import { ApiError, ErrorMessage } from '@/constants/constants';

export default function mapError(error: string | null): ErrorMessage {
  if (!error) return ErrorMessage.NO_ERROR;

  if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && !navigator.onLine) {
    return ErrorMessage.NETWORK_ERROR;
  }

  switch (error) {
    case ApiError.HTTP_404:
      return ErrorMessage.NOT_FOUND;

    case ApiError.HTTP_429:
      return ErrorMessage.TOO_MANY_REQUESTS;

    case ApiError.HTTP_500:
    case ApiError.HTTP_502:
    case ApiError.HTTP_503:
      return ErrorMessage.SERVER_ERROR;

    case ApiError.NETWORK_ERROR:
      return ErrorMessage.NETWORK_ERROR;

    default:
      return ErrorMessage.SERVER_ERROR;
  }
}
