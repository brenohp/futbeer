import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { Jogador } from '@/app/types'

export const config = {
  runtime: 'node', // para melhor compatibilidade com supabase
}

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const idNum = parseInt(context.params.id, 10)
    if (isNaN(idNum)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('jogadores')
      .select('*')
      .eq('id', idNum)
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json({ error: 'Jogador não encontrado' }, { status: 404 })
    }

    const jogador = data as Jogador

    return NextResponse.json(jogador)
  } catch (error) {
    console.error(
      'Erro ao ler jogador:',
      error instanceof Error ? error.message : JSON.stringify(error)
    )
    return NextResponse.json({ error: 'Erro ao ler jogador' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const idNum = parseInt(context.params.id, 10)
    if (isNaN(idNum)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('jogadores')
      .delete()
      .eq('id', idNum)
      .select()

    if (error) throw error

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Jogador não encontrado' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Jogador deletado' })
  } catch (error) {
    console.error(
      'Erro ao deletar jogador:',
      error instanceof Error ? error.message : JSON.stringify(error)
    )
    return NextResponse.json({ error: 'Erro ao deletar jogador' }, { status: 500 })
  }
}
