# Lambdatest

levantar base de datos:
  docker-compose up -d

configurar backend:
  cd backend
  npm install
  npx prisma generate
  npx prisma migrate dev --name init
  npm run start:dev

configurar fronentde:
  cd backend
  npm install
  npm run start
