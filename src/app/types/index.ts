export type Jogador = {
  id: string;
  nome: string;
  pontos: number;
  saldoGols: number;
  vitorias: number;
  derrotas: number;
};


export type Partida = {
  id: string;
  time1: string;
  jogadoresTime1?: string;
  golsTime1: number;
  time2: string;
  jogadoresTime2?: string;
  golsTime2: number;
  data: string;
};
