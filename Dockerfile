FROM node:22-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend-next/package.json frontend-next/package-lock.json ./
RUN npm ci
COPY frontend-next/ ./
ENV NEXT_PUBLIC_API_URL=""
RUN npm run build

FROM python:3.12-slim AS runtime
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8000 \
    DATABASE_PATH=/data/exam_os.db \
    UPLOAD_DIR=/data/uploads \
    FRONTEND_DIR=/app/backend/frontend-dist
WORKDIR /app
COPY backend/requirements.txt /app/backend/requirements.txt
RUN pip install --no-cache-dir -r /app/backend/requirements.txt
COPY backend/ /app/backend/
COPY data/ /app/data/
COPY --from=frontend-builder /app/frontend/out /app/backend/frontend-dist
RUN mkdir -p /data/uploads
WORKDIR /app/backend
EXPOSE 8000
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
