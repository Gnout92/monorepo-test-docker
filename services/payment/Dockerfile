FROM golang:1.22-alpine AS builder
WORKDIR /src

# Chỉ copy go.mod, không copy go.sum (tránh file go.sum hỏng)
COPY services/payment/go.mod ./
RUN go mod download

# Copy source rồi tidy + build
COPY services/payment/*.go ./
RUN go mod tidy
RUN CGO_ENABLED=0 GOOS=linux go build -o /bin/payment

FROM alpine:3.20
WORKDIR /app
COPY --from=builder /bin/payment /bin/payment
EXPOSE 3002
CMD ["/bin/payment"]
