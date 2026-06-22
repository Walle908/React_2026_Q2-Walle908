export default function buildUrl(page: number, query?: string, details?: string | null) {
  const params = new URLSearchParams();

  params.set('page', String(page));

  const trimmedQuery = query?.trim();
  if (trimmedQuery) {
    params.set('query', trimmedQuery);
  }

  if (details) {
    params.set('details', details);
  }

  return `/?${params.toString()}`;
}
