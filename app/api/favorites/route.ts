import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: '認証が必要です。' },
        { status: 401 }
      );
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json(
      { message: 'お気に入りの取得中にエラーが発生しました。' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: '認証が必要です。' },
        { status: 401 }
      );
    }

    const { text, author, weather, city } = await request.json();

    const favorite = await prisma.favorite.create({
      data: {
        text,
        author,
        weather,
        city,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(favorite);
  } catch (error) {
    console.error('Error creating favorite:', error);
    return NextResponse.json(
      { message: 'お気に入りの保存中にエラーが発生しました。' },
      { status: 500 }
    );
  }
} 