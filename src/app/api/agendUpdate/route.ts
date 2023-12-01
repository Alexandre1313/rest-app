import { NextRequest, NextResponse } from "next/server"
import conx from "../dataBase/db"

export async function PUT(req: NextRequest, resp: NextResponse) {
  const dados: any = await req.json();
  const conn = conx();

  try {
    const id = dados.id;
    const ativa = dados.ativa;    
    const updateSql = `UPDATE agend SET ativa = ? WHERE id = ?`
    const result = await conn.execute(updateSql, [ativa, id])
    if(result.rowsAffected > 0){ 
        try{  
            const selectSql = `SELECT * FROM agend WHERE id = ?`
            const { rows }= await conn.execute(selectSql, [id])
            return NextResponse.json(rows)
        }catch (error: any) {
            return NextResponse.json({ error: error.message })
        }
    }
    else {
      return NextResponse.json({ error: "Nenhum registro atualizado" })
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}
