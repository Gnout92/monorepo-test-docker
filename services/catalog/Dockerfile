FROM node:20-alpine AS deps
WORKDIR /app
COPY services/catalog/package.json services/catalog/package-lock.json* ./
RUN npm ci || npm i --package-lock-only && npm ci


FROM deps AS build
COPY services/catalog/tsconfig.json ./
COPY services/catalog/src ./src
RUN npm run build


FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY services/catalog/package.json ./
RUN npm i --omit=dev
EXPOSE 3001
CMD ["node", "dist/app.js"]