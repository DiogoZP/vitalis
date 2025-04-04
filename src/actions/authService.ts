'use server';
import { signIn, signOut } from '@/auth';

export async function login(formData: { email: string; senha: string }) {
    await signIn('credentials', formData);
}

export async function logout() {
    await signOut();
}
