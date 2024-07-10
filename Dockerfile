# Base stage
FROM node:14 AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# Development stage
FROM base AS development
ENV NODE_ENV=development
RUN npm install --only=development
CMD ["npm", "run", "dev"]

# Production stage
FROM base AS production
ENV NODE_ENV=production
RUN npm run build
CMD ["npm", "run", "start"]

# Expose port
EXPOSE 3000