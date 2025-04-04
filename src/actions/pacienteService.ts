'use server';
import { prisma } from '@/prisma';
import { PacienteForm } from '@/types/paciente';
import { uploadFile } from './uploadService';

export async function createPaciente(formData: PacienteForm) {
    const { upload, ...paciente } = formData;
    if (upload) {
        const { id: uploadId } = await uploadFile(upload);
        return await prisma.paciente.create({
            data: {
                ...paciente,
                uploadId: uploadId,
            },
        });
    }
    return await prisma.paciente.create({
        data: {
            ...paciente,
        },
    });
}
