import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { Jogador } from '@/app/types'

export const config = {
  runtime: 'node',
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('jogadores')
      .select('*')
      .order('id', { ascending: true })

    if (error) throw error

    const jogadores = data ?? []

    return NextResponse.json(jogadores)
  } catch (error) {
    console.error('Erro ao buscar jogadores:', error instanceof Error ? error.message : JSON.stringify(error))
    return NextResponse.json({ error: 'Erro ao buscar jogadores' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Atualize aqui para os campos minúsculos
    const body = await request.json()
    const novoJogador = {
      nome: body.nome,
      pontos: body.pontos,
      saldogols: body.saldogols,
      vitorias: body.vitorias,
      derrotas: body.derrotas,
    }

    const { data, error } = await supabase
      .from('jogadores')
      .insert([novoJogador])
      .select()
      .single()

    if (error) throw error

    const jogador = data as Jogador

    return NextResponse.json(jogador, { status: 201 })
  } catch (error) {
    console.error('Erro ao salvar jogador:', error instanceof Error ? error.message : JSON.stringify(error))
    return NextResponse.json({ error: 'Erro ao salvar jogador' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()

    if (!body.id) {
      return NextResponse.json({ error: 'ID do jogador é obrigatório' }, { status: 400 })
    }

    const jogadorAtualizado = {
      nome: body.nome,
      pontos: body.pontos,
      saldogols: body.saldogols,
      vitorias: body.vitorias,
      derrotas: body.derrotas,
    }

    const { data, error } = await supabase
      .from('jogadores')
      .update(jogadorAtualizado)
      .eq('id', body.id)
      .select()
      .single()

    if (error) throw error

    const jogador = data as Jogador

    return NextResponse.json(jogador)
  } catch (error) {
    console.error('Erro ao atualizar jogador:', error instanceof Error ? error.message : JSON.stringify(error))
    return NextResponse.json({ error: 'Erro ao atualizar jogador' }, { status: 500 })
  }
}
