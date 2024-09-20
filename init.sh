#!/bin/sh

# Wait for the database to be ready
./wait-for-it.sh db:5432 -- echo "Database is ready"

npm run migrate

# Check if the database is already seeded
if [ ! -f /var/lib/postgresql/data/seeded ]; then
  echo "Seeding the database..."
  npm run seed
  touch /var/lib/postgresql/data/seeded
fi

# Start the application
npm run start:prod