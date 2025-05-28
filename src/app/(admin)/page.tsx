'use client';

import { Clock, AlertTriangle, CircleCheckBig } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="h-screen">
            <h2 className="text-3xl font-bold mb-8">Gerenciamento de Exames</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-[#131619] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="text-[#4ac97e]">
                            <CircleCheckBig className="h-8 w-8" />
                        </div>
                        <span className="text-4xl font-bold">94</span>
                    </div>
                    <p className="text-[#d0d5dd]">Total de exames concluídos</p>
                </div>

                <div className="bg-[#131619] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="text-[#79b5ec]">
                            <Clock className="h-8 w-8" />
                        </div>
                        <span className="text-4xl font-bold">32</span>
                    </div>
                    <p className="text-[#d0d5dd]">Total de exames agendados</p>
                </div>

                <div className="bg-[#131619] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="text-[#ff4f4e]">
                            <AlertTriangle className="h-8 w-8" />
                        </div>
                        <span className="text-4xl font-bold">56</span>
                    </div>
                    <p className="text-[#d0d5dd]">Total de exames cancelados</p>
                </div>
            </div>
        </div>
    );
}
