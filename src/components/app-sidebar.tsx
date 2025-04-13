'use client';

import * as React from 'react';
import { UserRoundPlus, BriefcaseMedicalIcon, SquareUser, Calendar, Gauge } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';
import Image from 'next/image';

const data = {
    usuario: {
        nome: 'shadcn',
        email: 'm@example.com',
    },
    navMain: [
        {
            title: 'Dashboard',
            url: '/',
            icon: Gauge,
        },
        {
            title: 'Pacientes',
            url: '/pacientes',
            icon: UserRoundPlus,
        },
        {
            title: 'Médicos',
            url: '/medicos',
            icon: BriefcaseMedicalIcon,
        },
        {
            title: 'Agendamentos',
            url: '/agendamentos',
            icon: Calendar,
        },
        {
            title: 'Usuários',
            url: '/usuarios',
            icon: SquareUser,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="flex justify-center items-center">
                <Image
                    src="/assets/icons/logo-full.svg"
                    alt="logo"
                    width={300}
                    height={300}
                    className="w-[50%] mt-2 group-data-[collapsible=icon]:hidden"
                />
                <Image
                    src="/assets/icons/logo-icon.svg"
                    alt="logo"
                    width={300}
                    height={300}
                    className="w-4 hidden group-data-[collapsible=icon]:block"
                />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser usuario={data.usuario} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
