import { destroySession } from '@/app/lib/server-auth'
import { NextResponse } from 'next/server'

export async function POST() {
  destroySession()
  return NextResponse.json({ success: true })
}