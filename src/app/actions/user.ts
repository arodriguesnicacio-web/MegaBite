'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function checkAdminRole() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) return false;

    const dbUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    return dbUser?.role === 'ADMIN';
  } catch (error) {
    console.error('Erro ao verificar cargo:', error);
    return false;
  }
}