# Dockerfile.frontend
FROM node:20-alpine

WORKDIR /app
RUN corepack enable

# Copiar dependências do Yarn
COPY package*.json yarn.lock ./
RUN yarn install --immutable

# Copiar todo o código
COPY . .

# Variáveis de ambiente do frontend (Vite)
ARG VITE_API_URL
ARG VITE_API_BASE_URL

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV DOCKER=true

# Expor porta do frontend
EXPOSE 2000

# Comando para rodar o frontend em dev
CMD ["yarn", "dev"]