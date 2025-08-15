FROM node:18-alpine

WORKDIR /app

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Set ownership and permissions
RUN chown -R nextjs:nodejs /app && \
    chmod -R 755 /app

# Create .next directory with proper permissions
RUN mkdir -p /app/.next && \
    chown -R nextjs:nodejs /app/.next && \
    chmod -R 755 /app/.next

USER nextjs

EXPOSE 3010

CMD ["npm", "run", "dev"]
