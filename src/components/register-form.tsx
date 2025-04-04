import CustomField from '@/components/custom-field';
import { Form } from './ui/form';

export default function RegisterForm() {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <section className="mb-12 space-y-4"></section>
            </form>
        </Form>
    );
}
