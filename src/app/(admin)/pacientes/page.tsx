'use client';
import { getPacientes } from '@/actions/pacienteService';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Paciente } from '@prisma/client';
import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { AlertTriangle, LoaderCircle, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import useSWR from 'swr';

export default function Page() {
    const router = useRouter();

    const { data, error, isLoading } = useSWR('/pacientes', getPacientes);

    const columns = React.useMemo<ColumnDef<Paciente>[]>(
        () => [
            {
                accessorKey: 'nome',
                header: 'Nome',
                cell: ({ row }) => {
                    const nome = row.original.nome;
                    return (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-secondary-background">
                                {nome.slice(0, 2)}
                            </div>
                            <span>{nome}</span>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorKey: 'telefone',
                header: 'Telefone',
            },

            {
                accessorKey: 'planoSaude',
                header: 'Plano de Saúde',
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

    const [globalFilter, setGlobalFilter] = React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const table = useReactTable<Paciente>({
        data: data ?? [],
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

    if (isLoading) {
        return <LoaderCircle className="animate-spin" />;
    }

    if (error || !data) {
        return (
            <div className="flex w-full h-full items-center justify-center">
                <AlertTriangle color="red" />
                <p>Erro ao buscar pacientes!</p>
            </div>
        );
    }

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
                    <Button onClick={() => router.push('/pacientes/criar')}>
                        <Plus />
                        <p>Adicionar Paciente</p>
                    </Button>
                </div>
            </div>
            <DataTable table={table} />
        </>
    );
}
