# Stage 1: Build the app
FROM node:18-alpine AS builder
WORKDIR /app

# 1. Install required build tools
RUN apk add --no-cache python3 make g++

# 2. Copy package files first
COPY package*.json ./
COPY yarn.lock* ./
COPY pnpm-lock.yaml* ./

# 3. Install dependencies
RUN npm install

# 4. Copy all other files
COPY . .

# 5. Build the app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build

# Stage 2: Run the app
FROM node:18-alpine
WORKDIR /app

# 1. Copy only necessary files (FIXED SYNTAX HERE)
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# 2. Runtime environment
ENV NODE_ENV=production
ENV PORT=3000

# 3. Expose and run
EXPOSE 3000
CMD ["npm", "start"]