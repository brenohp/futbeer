'use client';

import Button from '../components/ui/Button';
import { Jogador } from '@/app/types';

type Props = {
  ordenarPor: (campo: keyof Jogador) => void;
  isAdmin: boolean;
  abrirModalJogador: () => void;
  abrirModalPartida: () => void;
};

export default function Header({
  ordenarPor,
  isAdmin,
  abrirModalJogador,
  abrirModalPartida,
}: Props) {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-6">Ranking da Pelada</h1>

      <div className="flex flex-wrap justify-center gap-3 mb-4">
        <Button onClick={() => ordenarPor('pontos')}>Ordenar por Pontos</Button>
        <Button onClick={() => ordenarPor('saldoGols')}>Saldo de Gols</Button>
        <Button onClick={() => ordenarPor('vitorias')}>Vitórias</Button>
        <Button onClick={() => ordenarPor('derrotas')}>Derrotas</Button>
      </div>

      {isAdmin && (
        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={abrirModalJogador} size="medium" color="green" className="rounded-full">Adicionar Jogador</Button>
          <Button onClick={abrirModalPartida} size ="medium" color='yellow' className='rounded-full'>Adicionar Partida</Button>
        </div>
      )}
    </header>
  );
}
