FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Expose port
EXPOSE 3007

# Set environment variables
ENV PORT=3007
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=development

# Start development server
CMD ["npm", "run", "dev"]
