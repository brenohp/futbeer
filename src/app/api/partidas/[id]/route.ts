import fs from 'fs';
import path from 'path';

const jsonPath = path.resolve(process.cwd(), 'src/app/data/partidas.json');

export const config = {
  runtime: 'node',
};

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const data = fs.readFileSync(jsonPath, 'utf-8');
    let partidas = JSON.parse(data);

    partidas = partidas.filter((p: { id: string }) => p.id !== id);

    fs.writeFileSync(jsonPath, JSON.stringify(partidas, null, 2));

    return new Response(JSON.stringify({ message: 'Partida excluída com sucesso' }), { status: 200 });
  } catch (error) {
    console.error('Erro no DELETE:', (error as Error).message);
    return new Response(JSON.stringify({ error: 'Erro ao deletar partida' }), { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const data = fs.readFileSync(jsonPath, 'utf-8');
    const partidas = JSON.parse(data);

    const index = partidas.findIndex((p: { id: string }) => p.id === id);

    if (index === -1) {
      return new Response(JSON.stringify({ error: 'Partida não encontrada' }), { status: 404 });
    }

    // Atualiza a partida existente com os novos dados do body
    partidas[index] = { ...partidas[index], ...body };

    fs.writeFileSync(jsonPath, JSON.stringify(partidas, null, 2));

    return new Response(JSON.stringify(partidas[index]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erro no PUT:', (error as Error).message);
    return new Response(JSON.stringify({ error: 'Erro ao atualizar partida' }), { status: 500 });
  }
}
