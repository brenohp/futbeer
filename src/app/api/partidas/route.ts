import fs from 'fs';
import path from 'path';

const jsonPath = path.resolve(process.cwd(), 'src/app/data/partidas.json');
export const config = {
  runtime: 'node',
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

export async function GET() {
  try {
    const data = fs.readFileSync(jsonPath, 'utf-8');
    const partidas: Partida[] = JSON.parse(data);
    return new Response(JSON.stringify(partidas), { status: 200 });
  } catch (error) {
    console.error('Erro ao ler partidas:', (error as Error).message);
    return new Response(JSON.stringify({ error: 'Erro ao ler partidas' }), { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newPartida = await request.json() as Partida;

    const data = fs.readFileSync(jsonPath, 'utf-8');
    const partidas: Partida[] = JSON.parse(data);

    const newId = partidas.length > 0
      ? (Math.max(...partidas.map(p => Number(p.id))) + 1).toString()
      : '1';
    newPartida.id = newId;

    partidas.push(newPartida);

    fs.writeFileSync(jsonPath, JSON.stringify(partidas, null, 2));

    return new Response(JSON.stringify(newPartida), { status: 201 });
  } catch (error) {
    console.error('Erro ao salvar partida:', (error as Error).message);
    return new Response(JSON.stringify({ error: 'Erro ao salvar partida' }), { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedPartida = await request.json() as Partida;

    const data = fs.readFileSync(jsonPath, 'utf-8');
    let partidas: Partida[] = JSON.parse(data);

    partidas = partidas.map(p => (p.id === updatedPartida.id ? updatedPartida : p));

    fs.writeFileSync(jsonPath, JSON.stringify(partidas, null, 2));

    return new Response(JSON.stringify(updatedPartida), { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar partida:', (error as Error).message);
    return new Response(JSON.stringify({ error: 'Erro ao atualizar partida' }), { status: 500 });
  }
}
