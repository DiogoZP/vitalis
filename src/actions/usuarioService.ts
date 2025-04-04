'use server';
import { prisma } from '@/prisma';
export async function findUser(email: string) {
    const user = await prisma.usuario.findUnique({
        where: {
            email: email,
        },
    });

    return user;
}
