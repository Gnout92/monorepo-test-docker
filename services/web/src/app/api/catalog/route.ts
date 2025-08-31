import { NextResponse } from 'next/server';
const BASE = process.env.GATEWAY_BASE || 'http://localhost:8080';
export async function GET() {
const r = await fetch(`${BASE}/catalog/products`, { cache: 'no-store' });
const data = await r.json();
return NextResponse.json(data, { status: r.status });
}