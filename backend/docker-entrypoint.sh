#!/bin/sh
set -e

echo "Running database seed (idempotent)..."
node dist/seed.js || echo "Seed step failed or already applied; continuing."

echo "Starting API..."
exec node dist/main.js
