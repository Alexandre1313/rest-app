import { NextRequest, NextResponse } from "next/server"
import conx  from "../dataBase/db"
import { compareDayaMonthYear } from "@/utils/getFunction"

export async function POST(req: NextRequest, resp: NextResponse) {  
  const dados: any = await req.json()
  const conn = conx()
  try { 
    const data1 = new Date(dados.dat)
    const data1TresAMais = data1.setHours(data1.getHours() + 3)
    const name = dados.name      
    const mesa = dados.table
    const ativa = dados.ativa  
    const data = new Date(dados.dat).toISOString().slice(0, 19).replace('T', ' ')
    
    const sqlb = `SELECT * FROM agend WHERE mesa = ? AND ativa = 'Sim'`
    const { rows } = await conn.execute(sqlb, [mesa])
    const rgMesa = rows.filter((e: any) => {          
      const isEquals = compareDayaMonthYear(e.data, new Date(data1TresAMais).toISOString())           
      return e.mesa === mesa && e.ativa === 'Sim' && isEquals
    })         
    if(rgMesa.length > 0){
      return NextResponse.json(rgMesa[0])
    }
    const sql = `
      INSERT INTO agend (name, data, mesa, ativa)
      VALUES (?, ?, ?, ?)
    `
    const results = await conn.execute(sql, [name, data, mesa, ativa])
    return NextResponse.json(results)
  } catch (error: any) {
    return NextResponse.json(error.message)
  }
}
