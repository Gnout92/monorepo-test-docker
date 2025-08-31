# Microservices CI/CD Skeleton – E-Commerce Demo

Monorepo demo e-commerce gồm:
- **Catalog** (Node.js/Express + Prisma + PostgreSQL)
- **Payment** (Go/Gin) – giả lập cổng thanh toán
- **Gateway** (Nginx) – reverse proxy/route API
- **Web** (Next.js) – UI trình chiếu sản phẩm + form thanh toán

## ✨ Tính năng nổi bật
- Monorepo 4 dịch vụ, tách bạch rõ ràng.
- **PostgreSQL + Prisma**: schema/migration/seed chuẩn chỉnh.
- **CI/CD**:
  - Build & Push image lên **GitHub Container Registry (GHCR)**.
  - **Helm chart** cho `catalog`, triển khai **canary** với **Argo Rollouts**.
- **Testing**:
  - Unit test (Jest) cho `catalog`.
  - **Playwright E2E** cho UI (luồng xem sản phẩm + thanh toán demo).
- **Docker Compose** cho local dev: chạy full stack trên máy cá nhân.

## 🧱 Kiến trúc
[ Web (Next.js) ] --> [ Gateway (Nginx) ] --> [ Catalog (Node/Express) ] --> [ PostgreSQL ]-----------> [ Payment (Go) ]


---

## 🚀 Chạy nhanh (Local)

Yêu cầu:
- **Docker Desktop** (Linux containers, WSL2)
- Node 20+ (nếu chạy tool cục bộ), Go 1.22+ (tuỳ chọn)

### Lần đầu (thiết lập DB + seed)
```bash
# bật Postgres trước
docker compose up -d postgres

# generate client + migrate + seed cho catalog
cd services/catalog
npx prisma generate
export DATABASE_URL='postgresql://app:app@localhost:5432/catalog?schema=public'
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
cd ../..
