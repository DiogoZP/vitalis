'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { login } from '@/actions/authService';
import { UsuarioForm, usuarioSchema } from '@/types/usuario';
import CustomField from './custom-field';

export default function LoginForm() {
    const form = useForm<UsuarioForm>({
        resolver: zodResolver(usuarioSchema),
        defaultValues: {
            email: '',
            senha: '',
        },
    });

    async function onSubmit(data: UsuarioForm) {
        await login(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Bem-vindo de volta!</h1>
                    <p className="text-dark-700">Faça login para fazer um agendamento</p>
                </section>
                <CustomField
                    control={form.control}
                    name="email"
                    fieldType="input"
                    label="Email:"
                    iconSrc="/assets/icons/email.svg"
                    placeholder="a@email.com"
                    iconAlt="email"
                />
                <CustomField
                    control={form.control}
                    name="senha"
                    fieldType="input"
                    label="Senha:"
                    placeholder="*****"
                />
                <Button type="submit" variant="default">
                    Entrar
                </Button>
            </form>
        </Form>
    );
}
