import { dishSchema } from "./../../../types/index"

import "server-only"

import { NextResponse, type NextRequest } from "next/server"
import { db } from "@/db"
import { menuItem } from "@/db/schema"

export async function GET() {
  const items = await db.select().from(menuItem)
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { error, data } = dishSchema.safeParse(body)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
  const newItem = await db.insert(menuItem).values({
    ...data,
  })
  return NextResponse.json(newItem)
}
