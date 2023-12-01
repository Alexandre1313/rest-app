import conx from "@/app/api/dataBase/db"
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, resp: NextResponse) {
    const dados: any = await req.json()
    const conn = conx() 
    try {
      const id = dados.id  
      if (!id) {
        return NextResponse.json({ error: 'ID não fornecido' })
      }  
      const sql = `DELETE FROM agend WHERE id = ?`  
      const results = await conn.execute(sql, [id]) 
      if (results.rowsAffected === 0) {
        return NextResponse.json({ error: 'Registro não encontrado' })
      }  
      return NextResponse.json({succes: 'Registro excluído com sucesso!'})
    } catch (error: any) {
      return NextResponse.json({ error: error.message })
    } 
  }
