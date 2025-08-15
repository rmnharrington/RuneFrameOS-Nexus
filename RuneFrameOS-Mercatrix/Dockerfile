FROM node:18-alpine

# Create app directory and user
WORKDIR /app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Set proper ownership and permissions
RUN chown -R nextjs:nodejs /app && \
    chmod -R 755 /app

# Create .next directory with proper permissions
RUN mkdir -p /app/.next && \
    chown -R nextjs:nodejs /app/.next && \
    chmod -R 755 /app/.next

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3008

# Set environment variables
ENV PORT=3008
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=development

# Start development server
CMD ["npm", "run", "dev"]
