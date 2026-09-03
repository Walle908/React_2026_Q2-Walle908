import { NextResponse } from 'next/server';
import { type Character } from '@/types/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids');

  if (!ids) {
    return new NextResponse('No IDs provided', { status: 400 });
  }

  try {
    const apiUrl = `https://rickandmortyapi.com/api/character/${ids}`;

    const response = await fetch(apiUrl, { cache: 'no-store' });

    const data = await response.json();

    const chars: Character[] = Array.isArray(data) ? data : [data];

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

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${chars.length}_items.csv"`,
      },
    });
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
