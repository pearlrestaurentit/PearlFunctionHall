import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // If admin is logged in, return all bookings
    if (session) {
      const bookings = await prisma.booking.findMany({
        orderBy: { date: 'asc' },
      });
      return NextResponse.json(bookings);
    }
    
    // If public user, return ONLY the dates of CONFIRMED bookings to prevent privacy leaks
    const publicBookings = await prisma.booking.findMany({
      where: { status: 'CONFIRMED' },
      select: { id: true, date: true, status: true },
      orderBy: { date: 'asc' },
    });
    return NextResponse.json(publicBookings);
    
  } catch (error) {
    console.error("Booking GET Error:", error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // POST is public so customers can submit enquiries
    const body = await request.json();
    const { name, email, phone, date, eventType, guests, message, status } = body;
    
    // Safety check: Public cannot force a CONFIRMED status
    const session = await getServerSession(authOptions);
    const finalStatus = (session && status) ? status : 'PENDING';
    
    const newBooking = await prisma.booking.create({
      data: {
        name,
        email: email || '',
        phone: phone || '',
        date: new Date(date),
        eventType: eventType || 'Other',
        guests: parseInt(guests || '0'),
        message,
        status: finalStatus
      },
    });
    
    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error("Booking POST Error:", error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    // PATCH requires admin session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { id, status } = body;
    
    // Prevent double booking race conditions
    if (status === 'CONFIRMED') {
      const bookingToConfirm = await prisma.booking.findUnique({ where: { id } });
      if (!bookingToConfirm) {
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
      }

      const existingConfirmed = await prisma.booking.findFirst({
        where: {
          date: bookingToConfirm.date,
          status: 'CONFIRMED',
          id: { not: id } // Exclude the current booking in case it's already confirmed
        }
      });

      if (existingConfirmed) {
        return NextResponse.json(
          { error: 'Another booking is already confirmed for this date.' }, 
          { status: 409 }
        );
      }
    }
    
    const updated = await prisma.booking.update({
      where: { id },
      data: { status }
    });
    
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update booking status' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { id } = body;

    await prisma.booking.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}
