'use client';

import { logout } from '@/actions/authService';
import Image from 'next/image';

export default function Page() {
    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[496px]">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={1000}
                        width={1000}
                        alt="logo"
                        className="mb-12 h-10 w-fit"
                    />
                    <button onClick={logout}>aaa</button>
                    <div className="text-14-regular mt-20 flex justify-between">
                        <p className="justify-items-end text-dark-600">© 2025 Vitalis</p>
                    </div>
                </div>
            </section>
            <Image
                src="/assets/images/register-img.png"
                height={1000}
                width={1000}
                alt="paciente"
                className="side-img max-w-[50%]"
                priority
            />
        </div>
    );
}
