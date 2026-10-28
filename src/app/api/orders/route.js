import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getOrders, createOrder } from '@/data-service';

// GET /api/orders
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const orders = await getOrders();
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('API GET Orders Error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

// POST /api/orders
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.customer?.name || !body.customer?.contact) {
      return NextResponse.json(
        { error: 'Customer name and contact information are required.' },
        { status: 400 }
      );
    }

    const savedOrder = await createOrder(body);
    return NextResponse.json(savedOrder, { status: 201 });
  } catch (error) {
    console.error('API POST Order Error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}