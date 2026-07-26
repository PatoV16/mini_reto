# Mini Reto — GitHub Profile Viewer

Prueba técnica full-stack: backend en **NestJS** que consulta la API pública de GitHub, y frontend en **Next.js** que consume ese endpoint para mostrar la información del perfil.

## Demo desplegada

- **Frontend (Vercel):** https://mini-reto.vercel.app
- **Backend (Railway):** https://minireto-production.up.railway.app

> **Nota:** el backend fue migrado de Render a Railway. El plan gratuito de Render "duerme" el servicio tras 15 minutos de inactividad, generando demoras y errores intermitentes en la primera carga (podía tardar hasta ~1 minuto en "despertar"). Railway no tiene ese comportamiento, por lo que la demo carga de forma consistente.

## Stack

| Parte | Tecnología |
|---|---|
| Backend | NestJS + TypeScript |
| Frontend | Next.js (App Router) + TypeScript |
| Fuente de datos | [GitHub REST API](https://docs.github.com/en/rest/users/users) |
| Despliegue backend | Railway |
| Despliegue frontend | Vercel |

## Estructura del repo (monorepo)

```
mini_reto/
├── backend/     # API NestJS
├── frontend/    # App Next.js
└── README.md
```

## Backend — NestJS

### Endpoint

```
GET /user/:username
```

Consulta la API pública de GitHub (`https://api.github.com/users/:username`) y devuelve:

```json
{
  "username": "PatoV16",
  "name": null,
  "bio": null,
  "avatarUrl": "https://avatars.githubusercontent.com/u/133371436?v=4",
  "publicRepos": 8,
  "followers": 1,
  "following": 1,
  "location": null,
  "company": null,
  "blog": "",
  "twitterUsername": null,
  "githubUrl": "https://github.com/PatoV16",
  "createdAt": "2023-05-12T13:08:11Z"
}
```

### Correr localmente

```bash
cd backend
npm install
npm run start:dev
```

El servidor levanta en `http://localhost:3000`.

### Variables de entorno (backend)

Opcional pero recomendado, para evitar el rate limit de la API pública de GitHub:

```
GITHUB_TOKEN=tu_personal_access_token
```

### Probar el endpoint

```bash
curl http://localhost:3000/user/PatoV16
```

### Tests

```bash
cd backend
npm run test
```

## Frontend — Next.js

Muestra la información del perfil de GitHub (avatar, nombre, bio, repos públicos, seguidores, siguiendo, ubicación, empresa, blog y fecha de creación de la cuenta) consumiendo el endpoint del backend.

### Variables de entorno

Creá un archivo `.env.local` dentro de `frontend/`:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

En producción, esta variable apunta a la URL del backend desplegado en Railway (`https://minireto-production.up.railway.app`).

### Correr localmente

```bash
cd frontend
npm install
npm run dev
```

La app levanta en `http://localhost:3001` (o el puerto disponible, ya que el 3000 lo usa el backend).

> Para correr el proyecto completo en local, es necesario tener **ambos servidores corriendo al mismo tiempo** (backend y frontend, en dos terminales distintas).

## Despliegue

- **Backend:** desplegado en Railway, con Root Directory `backend`, build command `npm install && npm run build` y start command `npm run start:prod`. El puerto público está configurado en `8080` (Networking → Public Networking), mapeado a `process.env.PORT` en `main.ts`.

<img width="1912" height="817" alt="image" src="https://github.com/user-attachments/assets/3650b0ed-7bb8-4509-88f0-1921ac9e7d14" />

- **Frontend:** desplegado en Vercel, con Root Directory `frontend` y la variable de entorno `NEXT_PUBLIC_API_URL` apuntando a la URL del backend en Railway.

<img width="1890" height="796" alt="image" src="https://github.com/user-attachments/assets/0a265f0d-cca5-4241-a18e-c6dea03deb5e" />

## Autor

Proyecto realizado como parte de una prueba técnica.
