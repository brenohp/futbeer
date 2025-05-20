import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export const config = {
  runtime: 'node', // edge funciona, mas node é mais confiável com supabase
}

export async function DELETE(_: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params
    const idNum = parseInt(id, 10)
    if (isNaN(idNum)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('partidas')
      .delete()
      .eq('id', idNum)
      .select('*')

    if (error) throw error

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Partida não encontrada' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Partida excluída com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar partida:', error instanceof Error ? error.message : JSON.stringify(error))
    return NextResponse.json({ error: 'Erro ao deletar partida' }, { status: 500 })
  }
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params
    const idNum = parseInt(id, 10)
    if (isNaN(idNum)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
    }

    const body = await request.json()

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
      .eq('id', idNum)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro ao atualizar partida:', error instanceof Error ? error.message : JSON.stringify(error))
    return NextResponse.json({ error: 'Erro ao atualizar partida' }, { status: 500 })
  }
}
