FROM node:18-alpine

# Create app directory
WORKDIR /app

# Create user and group for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Set ownership and permissions
RUN chown -R nextjs:nodejs /app
RUN chmod -R 755 /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3005

# Set environment variables
ENV PORT=3005
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=development

# Start the application
CMD ["npm", "run", "dev"]
