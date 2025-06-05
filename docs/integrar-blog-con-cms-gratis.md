# Integrar Blog con un CMS Gratuito

Este proyecto usa Next.js y Tailwind CSS. Si quieres administrar las entradas
de tu blog sin editar código cada vez, puedes conectarlo a un CMS gratuito.
A continuación se muestra un ejemplo usando **Strapi**, un CMS de código abierto.

## 1. Instalar Strapi

Puedes ejecutar Strapi localmente o desplegarlo en un servicio gratuito
como [Railway](https://railway.app/) o [Render](https://render.com/). Para
instalarlo localmente:

```bash
npx create-strapi-app@latest my-blog-cms --quickstart
```

Esto iniciará Strapi en `http://localhost:1337` con una base de datos SQLite.

## 2. Crear el modelo `Post`

Dentro del panel de Strapi, crea una colección llamada **Post** con los
siguientes campos básicos:

- **Title** (texto)
- **Slug** (UID basado en `Title`)
- **Content** (rich text o Markdown)
- **Excerpt** (texto)
- **Image** (media)
- **PublishedAt** (datetime)

Publica la colección para que sea accesible a través de la API.

## 3. Obtener las entradas desde Next.js

Agrega un archivo auxiliar en `lib/strapi.ts` para llamar a la API REST
de Strapi:

```ts
export interface Post {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    image: { url: string };
    publishedAt: string;
  };
}

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${process.env.STRAPI_URL}/api/posts?populate=image`);
  const json = await res.json();
  return json.data as Post[];
}
```

Coloca `STRAPI_URL` en un archivo `.env.local` (por ejemplo,
`http://localhost:1337`).

## 4. Usar los datos en la página del blog

En `app/blog/page.tsx`, reemplaza el arreglo estático de entradas por una
llamada a `getPosts()` dentro de un hook `useEffect` o usando
`getServerSideProps` según la versión de Next.js que utilices. Por ejemplo:

```tsx
useEffect(() => {
  getPosts().then(setPosts);
}, []);
```

## 5. Beneficios y otras opciones

Strapi es gratuito y de código abierto, pero existen otras alternativas como
[Sanity](https://www.sanity.io/) o el modo *headless* de WordPress.
Cualquiera de estos CMS permite manejar el contenido de forma visual y
mantener tu front-end en Next.js.

---
Esta guía ofrece solo una aproximación básica. Consulta la documentación de
Strapi o del CMS que elijas para profundizar.
