FROM node:24-alpine

# Set working directory
WORKDIR /app

# Copy package files for better dependency resolution
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY src ./src

# Create .env file with correct default values for Docker
RUN echo "PORT=3000" > .env && \
    echo "DB_USER=postgres" >> .env && \
    echo "DB_HOST=host.docker.internal" >> .env && \
    echo "DB_NAME=postgres-crud" >> .env && \
    echo "DB_PASSWORD=secret1234" >> .env && \
    echo "DB_PORT=5432" >> .env

# Expose port
EXPOSE 3000

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["node", "src/index.js"]

