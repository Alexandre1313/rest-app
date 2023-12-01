//import { NextRequest, NextResponse } from "next/server"
import conx  from "../dataBase/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const conn = conx()
  const { rows } = await conn.execute('select * from agend')  
  return Response.json(rows)
}
