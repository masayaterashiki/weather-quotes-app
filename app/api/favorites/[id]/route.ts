import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: '認証が必要です。' },
        { status: 401 }
      );
    }

    const favorite = await prisma.favorite.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!favorite) {
      return NextResponse.json(
        { message: 'お気に入りが見つかりません。' },
        { status: 404 }
      );
    }

    if (favorite.userId !== session.user.id) {
      return NextResponse.json(
        { message: 'このお気に入りを削除する権限がありません。' },
        { status: 403 }
      );
    }

    await prisma.favorite.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(
      { message: 'お気に入りを削除しました。' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting favorite:', error);
    return NextResponse.json(
      { message: 'お気に入りの削除中にエラーが発生しました。' },
      { status: 500 }
    );
  }
} 