import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/data-service';

export async function POST(request) {
  try {
    const body = await request.json();

    const newOrder = await createOrder({
      customer: body.customer,
      items: body.items,
      notes: body.notes,
      totalCost: body.totalCost,
    });

    return NextResponse.json(
      { success: true, orderNumber: newOrder.orderNumber },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}