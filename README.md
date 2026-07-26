# Mini Reto — GitHub Profile Viewer

Prueba técnica full-stack: backend en **NestJS** que consulta la API pública de GitHub, y frontend en **Next.js** que consume ese endpoint para mostrar la información del perfil.

##  Demo desplegada

- **Frontend (Vercel):** https://mini-reto.vercel.app
- **Backend (Render):** https://mini-reto.onrender.com

>  **Nota importante:** el backend está desplegado en el plan gratuito de Render, que "duerme" el servicio tras 15 minutos de inactividad. Si el frontend tarda en cargar la primera vez, es porque el backend se está "despertando" (puede tardar hasta ~1 minuto). Si eso pasa, esperá unos segundos y recargá.

##  Stack

| Parte | Tecnología |
|---|---|
| Backend | NestJS + TypeScript |
| Frontend | Next.js (App Router) + TypeScript |
| Fuente de datos | [GitHub REST API](https://docs.github.com/en/rest/users/users) |
| Despliegue backend | Render (Free tier) |
| Despliegue frontend | Vercel |

##  Estructura del repo (monorepo)

```
mini_reto/
├── backend/     # API NestJS
├── frontend/    # App Next.js
└── README.md
```

##  Backend — NestJS

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

### Probar el endpoint

```bash
curl http://localhost:3000/user/PatoV16
```

### Tests

```bash
cd backend
npm run test
```

##  Frontend — Next.js

Muestra la información del perfil de GitHub (avatar, nombre, bio, repos públicos, seguidores, siguiendo, ubicación, empresa, blog y fecha de creación de la cuenta) consumiendo el endpoint del backend.

### Variables de entorno

Creá un archivo `.env.local` dentro de `frontend/`:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

En producción, esta variable apunta a la URL del backend desplegado en Render.

### Correr localmente

```bash
cd frontend
npm install
npm run dev
```

La app levanta en `http://localhost:3001` (o el puerto disponible, ya que el 3000 lo usa el backend).

> Para correr el proyecto completo en local, es necesario tener **ambos servidores corriendo al mismo tiempo** (backend y frontend, en dos terminales distintas).

##  Despliegue

- **Backend:** desplegado en Render como Web Service, con Root Directory `backend`, build command `npm install && npm run build` y start command `npm run start:prod`.
- <img width="1585" height="807" alt="image" src="https://github.com/user-attachments/assets/67ed0275-359b-4a86-88a6-22825635ce6e" />

- **Frontend:** desplegado en Vercel, con Root Directory `frontend` y la variable de entorno `NEXT_PUBLIC_API_URL` apuntando a la URL del backend en Render.
- <img width="1582" height="726" alt="image" src="https://github.com/user-attachments/assets/9e2e544d-4026-46b8-96c5-75e963c58189" />


##  Autor

Proyecto realizado como parte de una prueba técnica.
