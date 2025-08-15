FROM node:18-alpine

# Set working directory
WORKDIR /app

# Create user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Set ownership
RUN chown -R nextjs:nodejs /app && \
    chmod -R 755 /app

# Create .next directory and set permissions
RUN mkdir -p /app/.next && \
    chown -R nextjs:nodejs /app/.next && \
    chmod -R 755 /app/.next

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3009

# Start the application
CMD ["npm", "run", "dev"]
