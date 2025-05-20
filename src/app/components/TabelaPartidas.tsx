'use client';

import { Partida } from '@/app/types';
import { Pencil, Trash2 } from 'lucide-react';

type Props = {
  partidas: Partida[];
  onEditar: (partida: Partida) => void;
  onDeletar: (id: string) => void;
  isAdmin: boolean;
};

export default function TabelaPartidas({ partidas, onEditar, onDeletar, isAdmin }: Props) {
  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full bg-white rounded shadow-md">
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Time 1</th>
            <th className="py-2 px-4">Time 2</th>
            <th className="py-2 px-4">Gols Time 1</th>
            <th className="py-2 px-4">Gols Time 2</th>
            <th className="py-2 px-4">Data</th>
            {isAdmin && <th className="py-2 px-4">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {partidas.length === 0 ? (
            <tr>
              <td colSpan={isAdmin ? 7 : 6} className="py-4 text-center text-gray-500">
                Nenhuma partida cadastrada.
              </td>
            </tr>
          ) : (
            partidas.map((partida, index) => (
              <tr key={partida.id} className="text-center border-b">
                <td className="py-2 px-4 font-semibold text-gray-800">{index + 1}</td>
                <td className="py-2 px-4 font-semibold text-gray-800">{partida.time1}</td>
                <td className="py-2 px-4 font-semibold text-gray-800">{partida.time2}</td>
                <td className="py-2 px-4 font-semibold text-gray-800">{partida.golstime1}</td>
                <td className="py-2 px-4 font-semibold text-gray-800">{partida.golstime2}</td>
                <td className="py-2 px-4 font-semibold text-gray-800">
                  {new Date(partida.data).toLocaleDateString()}
                </td>
                {isAdmin && (
                  <td className="py-2 px-4 flex justify-center gap-3">
                    <button
                      onClick={() => onEditar(partida)}
                      className="text-blue-600 hover:text-blue-800"
                      aria-label={`Editar partida ${index + 1}`}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDeletar(partida.id)}
                      className="text-red-600 hover:text-red-800"
                      aria-label={`Deletar partida ${index + 1}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
