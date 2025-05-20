'use client';

import { useState, useEffect } from 'react';
import { Jogador, Partida } from '@/app/types';
import Header from '@/app/components/Header';
import TabelaJogadores from '@/app/components/TabelaJogadores';
import TabelaPartidas from '@/app/components/TabelaPartidas';
import ModalJogador from '@/app/components/ModalJogador';
import ModalPartida from '@/app/components/ModalPartida';
import { useAdminStore } from '@/app/store/adminStore';

export default function Page() {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [jogadorEditando, setJogadorEditando] = useState<Jogador | null>(null);
  const [partidaEditando, setPartidaEditando] = useState<Partida | null>(null);
  const [modalJogadorAberto, setModalJogadorAberto] = useState(false);
  const [modalPartidaAberto, setModalPartidaAberto] = useState(false);

  const isAdmin = useAdminStore((state) => state.isAdmin);

  // Carrega jogadores da API
  const carregarJogadores = async () => {
    try {
      const res = await fetch('/api/jogadores');
      if (res.ok) {
        const data: Jogador[] = await res.json();
        setJogadores(data);
      } else {
        console.error('Erro ao carregar jogadores');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro na requisição jogadores:', error.message);
      } else {
        console.error('Erro desconhecido:', error);
      }
    }
  };

  // Carrega partidas da API
  const carregarPartidas = async () => {
    try {
      const res = await fetch('/api/partidas');
      if (res.ok) {
        const data: Partida[] = await res.json();
        setPartidas(data);
      } else {
        console.error('Erro ao carregar partidas');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro na requisição partidas:', error.message);
      } else {
        console.error('Erro desconhecido:', error);
      }
    }
  };

  useEffect(() => {
    carregarJogadores();
    carregarPartidas();
  }, []);

  // Modais controle
  const abrirModalJogador = () => setModalJogadorAberto(true);
  const fecharModalJogador = () => {
    setModalJogadorAberto(false);
    setJogadorEditando(null);
  };

  const abrirModalPartida = () => setModalPartidaAberto(true);
  const fecharModalPartida = () => {
    setModalPartidaAberto(false);
    setPartidaEditando(null);
  };

  // Ordena lista de jogadores por campo (ex: pontos, vitórias)
  const ordenarPor = (campo: keyof Jogador) => {
    const ordenados = [...jogadores].sort((a, b) =>
      a[campo] > b[campo] ? -1 : a[campo] < b[campo] ? 1 : 0
    );
    setJogadores(ordenados);
  };

  // Salva ou edita jogador
  const salvarJogador = async (jogador: Jogador) => {
    if (jogadorEditando) {
      // Editar localmente (ideal atualizar via API e recarregar)
      setJogadores((prev) =>
        prev.map((j) => (j.id === jogador.id ? jogador : j))
      );
      fecharModalJogador();
    } else {
      try {
        const res = await fetch('/api/jogadores', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jogador),
        });
        if (res.ok) {
          const novoJogador: Jogador = await res.json();
          setJogadores((prev) => [...prev, novoJogador]);
          fecharModalJogador();
        } else {
          alert('Erro ao salvar jogador');
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Erro na requisição:', error.message);
        } else {
          console.error('Erro desconhecido:', error);
        }
        alert('Erro ao salvar jogador');
      }
    }
  };

  // Salva ou edita partida
  const salvarPartida = async (partida: Partida) => {
    if (partidaEditando) {
      try {
        const res = await fetch(`/api/partidas/${partida.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(partida),
        });
        if (res.ok) {
          const partidaAtualizada: Partida = await res.json();
          setPartidas((prev) =>
            prev.map((p) => (p.id === partidaAtualizada.id ? partidaAtualizada : p))
          );
          fecharModalPartida();
        } else {
          alert('Erro ao atualizar partida');
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Erro na requisição:', error.message);
        } else {
          console.error('Erro desconhecido:', error);
        }
        alert('Erro ao atualizar partida');
      }
    } else {
      try {
        const res = await fetch('/api/partidas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(partida),
        });
        if (res.ok) {
          const novaPartida: Partida = await res.json();
          setPartidas((prev) => [...prev, novaPartida]);
          fecharModalPartida();
        } else {
          alert('Erro ao salvar partida');
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Erro na requisição:', error.message);
        } else {
          console.error('Erro desconhecido:', error);
        }
        alert('Erro ao salvar partida');
      }
    }
  };

  // Deletar partida
  const deletarPartida = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar essa partida?')) return;

    try {
      const res = await fetch(`/api/partidas/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setPartidas((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert('Erro ao deletar partida');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro na requisição:', error.message);
      } else {
        console.error('Erro desconhecido:', error);
      }
      alert('Erro ao deletar partida');
    }
  };

  // Deletar jogador (função que estava faltando passar para o componente)
  const deletarJogador = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar esse jogador?')) return;

    try {
      const res = await fetch(`/api/jogadores/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setJogadores((prev) => prev.filter((j) => j.id !== id));
      } else {
        alert('Erro ao deletar jogador');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro na requisição:', error.message);
      } else {
        console.error('Erro desconhecido:', error);
      }
      alert('Erro ao deletar jogador');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <Header
          ordenarPor={ordenarPor}
          isAdmin={isAdmin}
          abrirModalJogador={abrirModalJogador}
          abrirModalPartida={abrirModalPartida}
        />

        <TabelaJogadores
          jogadores={jogadores}
          onEditar={(jogador) => {
            setJogadorEditando(jogador);
            abrirModalJogador();
          }}
          onDeletar={deletarJogador}  
          isAdmin={isAdmin}
        />

        <TabelaPartidas
          partidas={partidas}
          onEditar={(partida) => {
            setPartidaEditando(partida);
            abrirModalPartida();
          }}
          onDeletar={deletarPartida}
          isAdmin={isAdmin}
        />

        <ModalJogador
          isOpen={modalJogadorAberto}
          onClose={fecharModalJogador}
          onSalvar={salvarJogador}
          jogadorEditando={jogadorEditando}
          onAtualizar={carregarJogadores}
        />

        <ModalPartida
          isOpen={modalPartidaAberto}
          onClose={fecharModalPartida}
          onSalvar={salvarPartida}
          partidaEditando={partidaEditando}
        />
      </div>
    </div>
  );
}
