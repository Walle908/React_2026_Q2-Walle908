export type UrlQueryObj = {
  page: string;
  query?: string;
  details?: string;
};

export default function buildUrl(page: number, query?: string, details?: string | null) {
  const params: UrlQueryObj = { page: String(page) };

  const trimmedQuery = query?.trim();
  if (trimmedQuery) {
    params.query = trimmedQuery;
  }

  if (details) {
    params.details = details;
  }

  return params;
}
