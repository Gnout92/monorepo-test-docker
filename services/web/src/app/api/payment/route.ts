import { NextRequest, NextResponse } from 'next/server';
const BASE = process.env.GATEWAY_BASE || 'http://localhost:8080';
export async function POST(req: NextRequest) {
try {
const body = await req.json();
const r = await fetch(`${BASE}/payment/charge`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body),
});
const data = await r.json();
return NextResponse.json(data, { status: r.status });
} catch (e) {
return NextResponse.json({ error: 'proxy failed' }, { status: 500 });
}
}