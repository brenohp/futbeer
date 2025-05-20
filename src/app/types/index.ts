export type Jogador = {
  id: number; // era string, agora deve ser number
  nome: string;
  pontos: number;
  saldogols: number;
  vitorias: number;
  derrotas: number;
};

export type Partida = {
  id: number; // era string, agora deve ser number
  time1: string;
  jogadorestime1?: string;
  golstime1: number;
  time2: string;
  jogadorestime2?: string;
  golstime2: number;
  data: string;
};
