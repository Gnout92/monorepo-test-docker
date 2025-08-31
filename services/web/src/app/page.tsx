import PaymentForm from '@/components/PaymentForm';


type Product = { id: string; name: string; price: number };
const BASE = process.env.GATEWAY_BASE || 'http://localhost:8080';


async function getProducts(): Promise<Product[]> {
const r = await fetch(`${BASE}/catalog/products`, { cache: 'no-store' });
if (!r.ok) return [];
const j = await r.json();
return j.items || [];
}


export default async function Page() {
const products = await getProducts();


return (
<main className="min-h-screen bg-gray-50">
<section className="bg-gradient-to-br from-slate-900 to-slate-700 text-white">
<div className="max-w-5xl mx-auto px-6 py-12">
<h1 className="text-3xl sm:text-4xl font-bold">E‑Commerce Demo</h1>
<p className="mt-2 text-slate-200">Microservices • Gateway • Next.js UI</p>
</div>
</section>


<div className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
<div className="md:col-span-2">
<h2 className="text-xl font-semibold mb-4">Products</h2>
<div className="grid sm:grid-cols-2 gap-6">
{products.map((p) => (
<div key={p.id} className="rounded-2xl border bg-white shadow-sm p-5">
<div className="text-lg font-medium">{p.name}</div>
<div className="mt-1 text-slate-600">#{p.id}</div>
<div className="mt-3 text-2xl font-semibold">
{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price)}
</div>
<button className="mt-4 w-full rounded-xl border px-4 py-2 hover:bg-slate-50">Add to cart</button>
</div>
))}
</div>
</div>


<div>
<h2 className="text-xl font-semibold mb-4">Payment test</h2>
<PaymentForm />
<div className="mt-6 text-sm text-slate-500">
Tip: This calls <code>/api/payment</code> which proxies to the gateway.
</div>
</div>
</div>
</main>
);
}