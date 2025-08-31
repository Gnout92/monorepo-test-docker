import supertest from 'supertest';
import { describe, it, expect } from '@jest/globals';
import app from '../src/app';

const agent = supertest(app);

describe('catalog api', () => {
  it('health', async () => {
    const res = await agent.get('/catalog/health');
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it('list products', async () => {
    const res = await agent.get('/catalog/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.items)).toBe(true);
  });
});
