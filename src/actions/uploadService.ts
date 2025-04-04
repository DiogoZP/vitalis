'use server';
import { prisma } from '@/prisma';
import fs from 'node:fs/promises';

export async function uploadFile(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const filename = `${file.name}-${Date.now()}`;
    await fs.writeFile(`./public/uploads/${filename}`, buffer);
    return await prisma.upload.create({
        data: {
            nome: file.name,
            filename: filename,
            mimetype: file.type,
        },
    });
}
