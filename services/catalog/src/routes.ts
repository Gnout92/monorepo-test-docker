import { Router } from 'express';


const router = Router();


const PRODUCTS = [
{ id: 'p1', name: 'T-Shirt', price: 199000 },
{ id: 'p2', name: 'Jeans', price: 399000 }
];


router.get('/health', (_req, res) => res.json({ ok: true }));


router.get('/products', (_req, res) => {
res.json({ items: PRODUCTS });
});


router.get('/products/:id', (req, res) => {
const item = PRODUCTS.find(p => p.id === req.params.id);
if (!item) return res.status(404).json({ error: 'Not found' });
res.json(item);
});


export default router;