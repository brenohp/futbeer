import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { Jogador } from '@/app/types'

export const config = {
  runtime: 'node',
}

export async function GET(request: Request, context: any) {
  const { id } = await context.params;


  try {
    const { data, error } = await supabase
      .from('jogadores')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json({ error: 'Jogador não encontrado' }, { status: 404 })
    }

    const jogador = data as Jogador

    return NextResponse.json(jogador)
  } catch (error) {
    console.error('Erro ao ler jogador:', error instanceof Error ? error.message : JSON.stringify(error))
    return NextResponse.json({ error: 'Erro ao ler jogador' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()

    // Garantir que o id seja número válido
    const id = typeof body.id === 'string' ? parseInt(body.id, 10) : body.id

    if (!id || isNaN(id)) {
      return NextResponse.json({ error: 'ID da partida é obrigatório e deve ser um número válido' }, { status: 400 })
    }

    const updatedPartida = {
      time1: body.time1,
      jogadorestime1: body.jogadorestime1,
      golstime1: body.golstime1,
      time2: body.time2,
      jogadorestime2: body.jogadorestime2,
      golstime2: body.golstime2,
      data: body.data,
    }

    const { data, error } = await supabase
      .from('partidas')
      .update(updatedPartida)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro ao atualizar partida:', error instanceof Error ? error.message : JSON.stringify(error))
    return NextResponse.json({ error: 'Erro ao atualizar partida' }, { status: 500 })
  }
}


export async function DELETE(request: Request, context: any) {
  const { id } = await context.params;

  try {
    const { data, error } = await supabase
      .from('partidas')
      .delete()
      .eq('id', id)  // id é UUID string
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Partida não encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Partida excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar partida:', error instanceof Error ? error.message : JSON.stringify(error));
    return NextResponse.json({ error: 'Erro ao deletar partida' }, { status: 500 });
  }
}
