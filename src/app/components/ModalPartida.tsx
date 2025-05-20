'use client';

import { Partida } from '@/app/types';
import Input from '@/app/components/ui/Input';
import { useState, useEffect } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSalvar: (partida: Partida) => void;
  partidaEditando?: Partida | null;
};

export default function ModalPartida({ isOpen, onClose, onSalvar, partidaEditando }: Props) {
  const [partida, setPartida] = useState<Partida>({
    id: '',
    time1: '',
    jogadoresTime1: '',
    golsTime1: 0,
    time2: '',
    jogadoresTime2: '',
    golsTime2: 0,
    data: '',
  });

  useEffect(() => {
    if (isOpen) {
      if (partidaEditando) {
        setPartida({
          ...partidaEditando,
          jogadoresTime1: partidaEditando.jogadoresTime1 || '',
          jogadoresTime2: partidaEditando.jogadoresTime2 || '',
        });
      } else {
        setPartida({
          id: '',
          time1: '',
          jogadoresTime1: '',
          golsTime1: 0,
          time2: '',
          jogadoresTime2: '',
          golsTime2: 0,
          data: '',
        });
      }
    }
  }, [isOpen, partidaEditando]);

  const handleSubmit = () => {
    if (!partida.time1 || !partida.time2 || !partida.data) return;
    onSalvar(partida);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-40"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-gray-800 font-semibold text-lg mb-4">
          {partidaEditando ? 'Editar Partida' : 'Adicionar Partida'}
        </h2>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Time 1</label>
            <Input
              placeholder="Nome do Time 1"
              value={partida.time1}
              onChange={(e) => setPartida({ ...partida, time1: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Jogadores</label>
            <Input
              placeholder="Jogadores do Time 1"
              value={partida.jogadoresTime1}
              onChange={(e) => setPartida({ ...partida, jogadoresTime1: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Gols</label>
            <Input
              type="number"
              placeholder="Gols do Time 1"
              value={partida.golsTime1}
              onChange={(e) => setPartida({ ...partida, golsTime1: +e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Time 2</label>
            <Input
              placeholder="Nome do Time 2"
              value={partida.time2}
              onChange={(e) => setPartida({ ...partida, time2: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Jogadores</label>
            <Input
              placeholder="Jogadores do Time 2"
              value={partida.jogadoresTime2}
              onChange={(e) => setPartida({ ...partida, jogadoresTime2: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Gols</label>
            <Input
              type="number"
              placeholder="Gols do Time 2"
              value={partida.golsTime2}
              onChange={(e) => setPartida({ ...partida, golsTime2: +e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Data</label>
            <Input
              type="date"
              value={partida.data}
              onChange={(e) => setPartida({ ...partida, data: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-between">
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
            {partidaEditando ? 'Salvar' : 'Adicionar'}
          </button>
        </div>
      </div>
    </div>
  );
}
