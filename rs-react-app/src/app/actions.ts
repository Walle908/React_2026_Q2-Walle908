'use server';

import { type Character } from '@/types/types';

export async function generateCsvAction(chars: Character[]) {
  if (!chars || chars.length === 0) {
    return { success: false, data: '' };
  }

  const headers = ['Name', 'Status', 'Species', 'Type', 'Gender', 'Origin', 'Location', 'URL'];

  const charsInfo = chars.map((c) => [
    `"${c.name ?? ''}"`,
    `"${c.status ?? ''}"`,
    `"${c.species ?? ''}"`,
    `"${c.type ?? ''}"`,
    `"${c.gender ?? ''}"`,
    `"${c.origin?.name ?? ''}"`,
    `"${c.location?.name ?? ''}"`,
    `"${c.url ?? ''}"`,
  ]);

  const csvContent = [headers, ...charsInfo].map((row) => row.join(',')).join('\n');

  return {
    success: true,
    data: csvContent,
  };
}
