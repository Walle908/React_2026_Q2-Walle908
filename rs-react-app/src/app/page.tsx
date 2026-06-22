import { getChars, getOneChar } from '@/services/api';
import HomeClient from '@/components/HomeClient';
import { initialPage } from '@/constants/constants';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    query?: string;
    details?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const page = Number(params.page ?? initialPage);
  const query = params.query ?? '';
  const id = params.details ?? null;

  const [listResult, detailResult] = await Promise.all([
    getChars(query, page),
    id ? getOneChar(id) : Promise.resolve({ data: null, error: null }),
  ]);

  return (
    <HomeClient
      currentPage={page}
      currentQuery={query}
      list={listResult}
      selectedChar={detailResult}
      selectedId={id}
    />
  );
}
