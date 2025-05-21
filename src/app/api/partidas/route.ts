import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { Partida } from '@/app/types'

export const config = {
  runtime: 'node', // mais estável com supabase
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('partidas')
      .select('*')
      .order('id', { ascending: true })

    if (error) throw error

    return NextResponse.json(data ?? [])
  } catch (error) {
    console.error('Erro ao buscar partidas:', error instanceof Error ? error.message : JSON.stringify(error))
    return NextResponse.json({ error: 'Erro ao buscar partidas' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const newPartida = {
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
      .insert([newPartida])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Erro ao salvar partida:', error instanceof Error ? error.message : JSON.stringify(error))
    return NextResponse.json({ error: 'Erro ao salvar partida' }, { status: 500 })
  }
}