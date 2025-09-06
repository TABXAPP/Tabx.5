FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY src/ ./src/

# Create logs directory
RUN mkdir -p logs

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S tabx -u 1001

# Change ownership of the app directory
RUN chown -R tabx:nodejs /app
USER tabx

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD-SHELL curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["node", "src/index.js"]