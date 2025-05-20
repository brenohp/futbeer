'use client';

import { Jogador } from '../types';
import { Pencil, Trash2 } from 'lucide-react';

type Props = {
  jogadores: Jogador[];
  onEditar: (jogador: Jogador) => void;
  onDeletar: (id: string) => void;
  isAdmin: boolean;
};

export default function TabelaJogadores({ jogadores, onEditar, onDeletar, isAdmin }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow-md">
        <thead>
          <tr className="bg-blue-600 text-white text-center">
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Nome</th>
            <th className="py-2 px-4">Pontos</th>
            <th className="py-2 px-4">Saldo de Gol</th>
            <th className="py-2 px-4">Vitórias</th>
            <th className="py-2 px-4">Derrotas</th>
            {isAdmin && <th className="py-2 px-4">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {jogadores
            .filter((j) => j.id)
            .map((jogador, index) => (
              <tr key={jogador.id} className="text-center border-b">
                <td className="py-2 px-4 font-semibold text-gray-800">{index + 1}</td>
                <td className="py-2 px-4 font-semibold text-gray-800">{jogador.nome}</td>
                <td className="py-2 px-4 font-semibold text-gray-800">{jogador.pontos}</td>
                <td className="py-2 px-4 font-semibold text-gray-800">{jogador.saldoGols}</td>
                <td className="py-2 px-4 font-semibold text-gray-800">{jogador.vitorias}</td>
                <td className="py-2 px-4 font-semibold text-gray-800">{jogador.derrotas}</td>
                {isAdmin && (
                  <td className="py-2 px-4 flex justify-center gap-3">
                    <button
                      onClick={() => onEditar(jogador)}
                      className="text-blue-600 hover:text-blue-800"
                      aria-label={`Editar jogador ${index + 1}`}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDeletar(jogador.id)}
                      className="text-red-600 hover:text-red-800"
                      aria-label={`Deletar jogador ${index + 1}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
