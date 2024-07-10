# Base stage
FROM node:14 AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# Build stage
FROM base AS build
ENV NODE_ENV=production
RUN npx tsc

# Production stage
FROM build AS production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
ENV NODE_ENV=production
CMD ["node", "dist/src/index.js"]

# Expose port
EXPOSE 3000