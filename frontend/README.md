# PostgreSQL CRUD Frontend

A React 18 frontend application built with Vite for the PostgreSQL CRUD project.

## Features

- ✅ React 18 with Vite
- ✅ Modern UI with CSS Grid and Flexbox
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Responsive design
- ✅ Docker support
- ✅ Docker Compose integration

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Docker Commands

### Development
```bash
docker build -t postgres-crud-frontend .
docker run -p 5173:5173 postgres-crud-frontend
```

### Production
```bash
docker build -f Dockerfile.prod -t postgres-crud-frontend:prod .
docker run -p 80:80 postgres-crud-frontend:prod
```

## Docker Compose

The frontend is included in the main `docker-compose.yml` file and will start automatically with:

```bash
docker-compose up --build
```

## API Integration

The frontend connects to the backend API at `http://localhost:3000/api/users` for all CRUD operations.

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: http://localhost:3000)
