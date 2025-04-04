import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { findUser } from './actions/usuarioService';
import { usuarioSchema } from './types/usuario';

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: '/login',
        error: '/login',
    },
    session: {
        maxAge: 7200,
    },
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: {},
                senha: {},
            },
            authorize: async (credentials) => {
                if (!credentials) return null;

                try {
                    const { email, senha } = usuarioSchema.parse(credentials);

                    const usuario = await findUser(email);

                    if (!usuario) return null;

                    if (!(await bcrypt.compare(senha, usuario.senha))) return null;

                    return {
                        id: usuario.id.toString(),
                        email: usuario.email,
                        name: usuario.nome,
                    };
                } catch (_e: unknown) {
                    return null;
                }
            },
        }),
    ],
});
