'use client';
import { useState } from 'react';


export default function PaymentForm() {
const [amount, setAmount] = useState<number>(50000);
const [loading, setLoading] = useState(false);
const [result, setResult] = useState<any>(null);
const [error, setError] = useState<string | null>(null);


const pay = async () => {
setLoading(true);
setError(null);
setResult(null);
try {
const r = await fetch('/api/payment', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ amount }),
});
const data = await r.json();
if (!r.ok) setError(data?.error || 'Payment failed');
else setResult(data);
} catch (e: any) {
setError(e?.message || 'Network error');
} finally {
setLoading(false);
}
};


return (
<div className="rounded-2xl border bg-white p-5 shadow-sm">
<label className="block text-sm font-medium text-slate-700">Amount (VND)</label>
<input
type="number"
className="mt-2 w-full rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300"
value={amount}
min={0}
onChange={(e) => setAmount(parseInt(e.target.value || '0', 10))}
/>
<button
onClick={pay}
disabled={loading || amount <= 0}
className="mt-4 w-full rounded-xl bg-slate-900 text-white px-4 py-2 hover:bg-slate-800 disabled:opacity-50"
>
{loading ? 'Processing…' : 'Pay demo'}
</button>


{result && (
<div className="mt-4 rounded-xl border bg-green-50 p-4 text-green-700">
<div className="font-semibold">Approved</div>
<div className="text-sm">Amount: {new Intl.NumberFormat('vi-VN').format(result.amount)} VND</div>
</div>
)}
{error && (
<div className="mt-4 rounded-xl border bg-red-50 p-4 text-red-700">{error}</div>
)}
</div>
);
}