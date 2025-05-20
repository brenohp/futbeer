import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { Jogador } from '@/app/types'

const jsonPath = path.resolve(process.cwd(), 'src/app/data/jogadores.json')

export const config = {
  runtime: 'node',
}

export async function GET() {
  try {
    const data = fs.readFileSync(jsonPath, 'utf-8')
    const jogadores: Jogador[] = JSON.parse(data)
    return NextResponse.json(jogadores)
  } catch (error) {
    console.error('Erro ao ler jogadores:', error)
    return NextResponse.json({ error: 'Erro ao ler jogadores' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const novoJogador: Omit<Jogador, 'id'> = await request.json()
    const data = fs.readFileSync(jsonPath, 'utf-8')
    const jogadores: Jogador[] = JSON.parse(data)

    const maiorId = jogadores.reduce((max, j) => {
      const idNum = Number(j.id)
      return idNum > max ? idNum : max
    }, 0)

    const novoId = (maiorId + 1).toString()

    const jogadorComId: Jogador = { ...novoJogador, id: novoId }
    jogadores.push(jogadorComId)

    fs.writeFileSync(jsonPath, JSON.stringify(jogadores, null, 2))

    return NextResponse.json(jogadorComId, { status: 201 })
  } catch (error) {
    console.error('Erro ao salvar jogador:', error)
    return NextResponse.json({ error: 'Erro ao salvar jogador' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const jogadorAtualizado: Jogador = await request.json()
    if (!jogadorAtualizado.id) {
      return NextResponse.json({ error: 'ID do jogador é obrigatório' }, { status: 400 })
    }

    const data = fs.readFileSync(jsonPath, 'utf-8')
    const jogadores: Jogador[] = JSON.parse(data)

    const index = jogadores.findIndex((j) => j.id === jogadorAtualizado.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Jogador não encontrado' }, { status: 404 })
    }

    jogadores[index] = jogadorAtualizado

    fs.writeFileSync(jsonPath, JSON.stringify(jogadores, null, 2))

    return NextResponse.json(jogadorAtualizado)
  } catch (error) {
    console.error('Erro ao atualizar jogador:', error)
    return NextResponse.json({ error: 'Erro ao atualizar jogador' }, { status: 500 })
  }
}
