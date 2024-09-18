#!/bin/sh

# Wait for the database to be ready
until nc -z -v -w30 db 5432; do
  echo "Waiting for database..."
  sleep 2
done

# Check if the database is already seeded
if [ ! -f /var/lib/postgresql/data/seeded ]; then
  echo "Seeding the database..."
  npm run seed
  touch /var/lib/postgresql/data/seeded
fi

# Start the application
npm run start:prod

