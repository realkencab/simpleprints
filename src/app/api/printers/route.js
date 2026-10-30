import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getPrinters } from '@/lib/data-service';

// GET /api/printers
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const printers = await getPrinters();
    return NextResponse.json(printers, { status: 200 });
  } catch (error) {
    console.error('API GET Printers Error:', error);
    return NextResponse.json({ error: 'Failed to fetch printers' }, { status: 500 });
  }
}