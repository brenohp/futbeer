'use client';

import { Jogador } from '@/app/types';
import { useState, useEffect } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSalvar: (jogador: Jogador) => void;
  jogadorEditando?: Jogador | null;
  onAtualizar?: () => void; // opcional, já que não usou
};

export default function ModalJogador({ isOpen, onClose, onSalvar, jogadorEditando }: Props) {
  const [jogador, setJogador] = useState<Jogador>({
    id: '',
    nome: '',
    pontos: 0,
    saldogols: 0,
    vitorias: 0,
    derrotas: 0,
  });

  useEffect(() => {
    if (isOpen) {
      if (jogadorEditando) {
        setJogador(jogadorEditando);
      } else {
        setJogador({
          id: '',
          nome: '',
          pontos: 0,
          saldogols: 0,
          vitorias: 0,
          derrotas: 0,
        });
      }
    }
  }, [isOpen, jogadorEditando]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!jogador.nome.trim()) return;
    onSalvar(jogador);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-40"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-md border border-gray-300 p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-gray-800 font-semibold text-lg mb-6">
          {jogadorEditando ? 'Editar jogador' : 'Adicionar jogador'}
        </h2>

        {/* Inputs */}

        <div className="mb-4">
          <label htmlFor="nome" className="block text-gray-700 mb-1 font-medium">Nome</label>
          <input
            id="nome"
            type="text"
            value={jogador.nome}
            onChange={(e) => setJogador({ ...jogador, nome: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Nome"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="pontos" className="block text-gray-700 mb-1 font-medium">Pontos</label>
          <input
            id="pontos"
            type="number"
            value={jogador.pontos}
            onChange={(e) => setJogador({ ...jogador, pontos: Number(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Pontos"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="saldoGols" className="block text-gray-700 mb-1 font-medium">Saldo de Gol</label>
          <input
            id="saldoGols"
            type="number"
            value={jogador.saldogols}
            onChange={(e) => setJogador({ ...jogador, saldogols: Number(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Saldo de Gol"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="vitorias" className="block text-gray-700 mb-1 font-medium">Vitórias</label>
          <input
            id="vitorias"
            type="number"
            value={jogador.vitorias}
            onChange={(e) => setJogador({ ...jogador, vitorias: Number(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Vitórias"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="derrotas" className="block text-gray-700 mb-1 font-medium">Derrotas</label>
          <input
            id="derrotas"
            type="number"
            value={jogador.derrotas}
            onChange={(e) => setJogador({ ...jogador, derrotas: Number(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Derrotas"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {jogadorEditando ? 'Salvar' : 'Adicionar'}
          </button>
        </div>
      </div>
    </div>
  );
}
