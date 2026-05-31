import { ErrorMessage } from '@/constants/constants';

export default function getErrorMessage(error: unknown): ErrorMessage {
  if (!error) return ErrorMessage.NO_ERROR;

  if (typeof error === 'object' && error !== null && 'status' in error) {
    if (error.status === 404) {
      return ErrorMessage.NOT_FOUND;
    }
  }
  return ErrorMessage.SERVER_ERROR;
}
