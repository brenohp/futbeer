import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const jsonPath = path.resolve(process.cwd(), 'src/app/data/jogadores.json')

interface Jogador {
  id: string
  nome: string
  pontos: number
  saldoGols: number
  vitorias: number
  derrotas: number
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const jogadorAtualizado: Jogador = await request.json()

    const data = fs.readFileSync(jsonPath, 'utf-8')
    const jogadores: Jogador[] = JSON.parse(data)

    const index = jogadores.findIndex((j) => j.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Jogador não encontrado' }, { status: 404 })
    }

    jogadores[index] = { ...jogadores[index], ...jogadorAtualizado, id } // garante que o id não será alterado

    fs.writeFileSync(jsonPath, JSON.stringify(jogadores, null, 2))

    return NextResponse.json(jogadores[index])
  } catch (error) {
    console.error('Erro ao atualizar jogador:', error)
    return NextResponse.json({ error: 'Erro ao atualizar jogador' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const data = fs.readFileSync(jsonPath, 'utf-8')
    const jogadores: Jogador[] = JSON.parse(data);

    const index = jogadores.findIndex((j) => j.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Jogador não encontrado' }, { status: 404 })
    }

    jogadores.splice(index, 1) // remove o jogador do array

    fs.writeFileSync(jsonPath, JSON.stringify(jogadores, null, 2))

    return NextResponse.json({ message: 'Jogador excluído com sucesso' }, { status: 200 })
  } catch (error) {
    console.error('Erro ao deletar jogador:', error)
    return NextResponse.json({ error: 'Erro ao deletar jogador' }, { status: 500 })
  }
}
