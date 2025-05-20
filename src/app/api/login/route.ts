import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { login, senha }: { login: string; senha: string } = await request.json()

    if (login === 'admin' && senha === 'admin123') {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { success: false, message: 'Usuário ou senha incorretos' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: 'Erro no servidor' },
      { status: 500 }
    )
  }
}
