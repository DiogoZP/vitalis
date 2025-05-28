'use client';
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    ColumnFiltersState,
} from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import DataTable from '@/components/ui/data-table';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';
import { Search, Pencil, Trash2, Plus } from 'lucide-react';

type Exam = {
    id: number;
    paciente: string;
    data: string;
    status: 'Concluído' | 'Agendado' | 'Cancelado';
    medico: string;
};

export default function Page() {
    const router = useRouter();
    const columns = React.useMemo<ColumnDef<Exam>[]>(
        () => [
            {
                accessorKey: 'paciente',
                header: 'Paciente',
                cell: ({ row }) => {
                    const paciente = row.original.paciente;
                    return (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-secondary-background">
                                {paciente.slice(0, 2)}
                            </div>
                            <span>{paciente}</span>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'data',
                header: 'Data',
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: ({ row }) => {
                    const status = row.original.status;
                    const getStatusColor = (value: string) => {
                        switch (value) {
                            case 'Concluído':
                                return '#4ac97e';
                            case 'Agendado':
                                return '#79b5ec';
                            case 'Cancelado':
                                return '#ff4f4e';
                            default:
                                return '#4ac97e';
                        }
                    };
                    const color = getStatusColor(status);
                    return (
                        <div className="flex items-center gap-2">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: color }}
                            ></div>
                            <span style={{ color }}>{status}</span>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'medico',
                header: 'Médico',
                cell: ({ row }) => {
                    const medico = row.original.medico;
                    return (
                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>{medico.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <span>{medico}</span>
                        </div>
                    );
                },
            },
            {
                id: 'actions',
                header: 'Ações',
                enableSorting: false,
                cell: () => {
                    return (
                        <div className="flex justify-start w-full gap-3">
                            <TooltipProvider>
                                {' '}
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button>
                                            <Pencil />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Editar</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="destructive">
                                            <Trash2 />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-destructive">
                                        Deletar
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    );
                },
            },
        ],
        [],
    );

    const data = React.useMemo<Exam[]>(
        () => [
            {
                id: 1,
                paciente: 'Pedro Aparecido',
                data: '10/03/2025 - 13:00',
                status: 'Concluído',
                medico: 'Alex Ramos',
            },
            {
                id: 2,
                paciente: 'João Vitor',
                data: '15/04/2025 - 09:15',
                status: 'Agendado',
                medico: 'Michel Ferraz',
            },
            {
                id: 3,
                paciente: 'Lucas Gabriel',
                data: '30/03/2025 - 08:00',
                status: 'Cancelado',
                medico: 'Jaqueline Gomes',
            },
            {
                id: 4,
                paciente: 'Isabela Ferreira',
                data: '01/01/2025 - 14:30',
                status: 'Concluído',
                medico: 'Felipe da Silva',
            },
            {
                id: 5,
                paciente: 'Nathan Ferreira',
                data: '01/05/2025 - 15:00',
                status: 'Agendado',
                medico: 'Aline Cruz',
            },
        ],
        [],
    );

    const [globalFilter, setGlobalFilter] = React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: 'includesString',
        state: {
            sorting,
            globalFilter,
        },
    });
    return (
        <>
            <div className="flex flex-col md:flex-row gap-4 my-2">
                <div className="w-full">
                    <Input
                        Icon={Search}
                        placeholder="Pesquisar por paciente, data, médico..."
                        className="bg-[#131619] border-[#1c2023] text-white h-10 rounded-lg focus:ring-[#79b5ec] focus:border-[#79b5ec]"
                        value={globalFilter.toString()}
                        onChange={(e) => table.setGlobalFilter(String(e.target.value))}
                    />
                </div>
                <div className="flex">
                    <Button onClick={() => router.push('/agendamentos/criar')}>
                        <Plus />
                        <p>Adicionar Agendamento</p>
                    </Button>
                </div>
            </div>
            <DataTable table={table} />
        </>
    );
}
