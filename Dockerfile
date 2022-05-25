FROM node:16 AS builder
ENV NODE_ENV production
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY . .
RUN npm ci
# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM nginx as production
ENV NODE_ENV production
# Copy built assets from builder
RUN rm /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html/
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Start nginx
CMD ["nginx", "-g", "daemon off;"]