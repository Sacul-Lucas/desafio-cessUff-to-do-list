# Dockerfile.backend
FROM node:20-alpine

# Definir diretório de trabalho
WORKDIR /app

# Habilitar corepack (para Yarn)
RUN corepack enable

# Copiar arquivos de dependência
COPY package*.json yarn.lock ./

# Instalar dependências de forma imutável
RUN yarn install --immutable

# Copiar todo o código
COPY . .

# Variáveis de ambiente do backend (podem ser sobrescritas pelo docker-compose)
ENV PORT=2500

# Expor porta do backend
EXPOSE 2500

# Comando para iniciar em dev ou build
CMD ["yarn", "start:dev"]