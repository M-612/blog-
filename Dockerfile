# ---------- BUILD FRONTEND ----------
FROM node:18 AS frontend-build
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# ---------- BUILD BACKEND ----------
FROM node:18 AS backend
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./
RUN npm install

# Copy backend code
COPY backend ./

# Copy frontend build to backend/public (so server can serve it)
RUN mkdir -p public
COPY --from=frontend-build /frontend/build ./public

EXPOSE 5000
CMD ["node", "server.js"]
