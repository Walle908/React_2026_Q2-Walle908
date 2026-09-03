'use server';

import { redirect } from 'next/navigation';
import { initialPage } from '@/constants/constants';

export const searchAction = async (
  locale: string,
  _prevState: unknown,
  formData: FormData
): Promise<void> => {
  const query = String(formData.get('query') ?? '').trim();

  const params = new URLSearchParams({ page: String(initialPage) });
  if (query) {
    params.set('query', query);
  }

  redirect(`/${locale}?${params.toString()}`);
};
