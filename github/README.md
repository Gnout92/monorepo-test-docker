# Microservices CI/CD Skeleton – E-Commerce Demo


## Run locally
1) Install Docker Desktop.
2) From repo root: `docker compose up --build`.
3) Try:
- `GET http://localhost:8080/catalog/health`
- `GET http://localhost:8080/catalog/products`
- `POST http://localhost:8080/payment/charge` with JSON `{ "amount": 50000 }`


## CI
GitHub Actions builds/tests each service and scans images with Trivy.