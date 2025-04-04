import z from 'zod';

export const usuarioSchema = z.object({
    email: z
        .string({ required_error: 'email é obrigatório' })
        .max(50, { message: 'email deve ter no máximo 50 caracteres' })
        .email(),
    senha: z
        .string({ required_error: 'senha é obrigatório' })
        .max(50, { message: 'senha deve ter no máximo 50 caracteres' }),
});

export type UsuarioForm = z.infer<typeof usuarioSchema>;
