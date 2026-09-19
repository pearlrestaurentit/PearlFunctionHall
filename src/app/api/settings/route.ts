import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    let settings = await prisma.hallSettings.findFirst();
    if (!settings) {
      settings = await prisma.hallSettings.create({
        data: {
          name: 'The Pearl Function Hall',
          address: 'NEW BLUEEARTH Restaurant, (The Pearl multi cuisine)',
          phone: '+91 79979 95312',
          email: 'pearlrestaurentit@gmail.com',
          capacity: 1500,
          description: 'Experience unparalleled elegance and top-tier service at The Pearl Function Hall, the perfect venue for your luxurious weddings and events.',
        }
      });
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, name, address, phone, email, capacity, description } = body;
    
    const updatedSettings = await prisma.hallSettings.update({
      where: { id },
      data: {
        name,
        address,
        phone,
        email,
        capacity: parseInt(capacity),
        description,
      },
    });
    
    return NextResponse.json(updatedSettings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
