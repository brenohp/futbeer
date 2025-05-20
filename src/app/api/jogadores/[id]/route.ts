import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { Jogador } from '@/app/types'

export const config = {
  runtime: 'node', // troquei para 'node' para evitar problemas com supabase
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { data, error } = await supabase
      .from('jogadores')
      .select('*')
      .eq('id', params.id)
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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { data, error } = await supabase
      .from('jogadores')
      .delete()
      .eq('id', params.id)
      .select()

    if (error) throw error

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Jogador não encontrado' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Jogador deletado' })
  } catch (error) {
    console.error('Erro ao deletar jogador:', error instanceof Error ? error.message : JSON.stringify(error))
    return NextResponse.json({ error: 'Erro ao deletar jogador' }, { status: 500 })
  }
}
