# ReLink - Acortador de URLs

ReLink es una plataforma similar a Bitly para acortar URLs, con capacidades de seguimiento de estadísticas y personalización de enlaces.

## Características

- Acorta enlaces largos en URLs más manejables
- Personaliza la parte final del enlace acortado
- Seguimiento de métricas de clics:
  - Número total de clics
  - País de origen
  - Tipo de dispositivo
  - Navegador utilizado
  - Hora del clic
- Interfaz moderna y fácil de usar
- Base de datos SQLite para almacenamiento de datos

## Tecnologías

- [Astro](https://astro.build/) - Framework web moderno
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [SQLite](https://www.sqlite.org/) - Base de datos
- [Drizzle ORM](https://orm.drizzle.team/) - ORM para la base de datos
- [Cloudflare](https://www.cloudflare.com/) - Despliegue y hosting

## Instalación

1. Clona este repositorio
```bash
git clone https://github.com/tu-usuario/relink.git
cd relink
```

2. Instala las dependencias
```bash
npm install
```

3. Ejecuta el proyecto en modo desarrollo
```bash
npm run dev
```

4. Construye para producción
```bash
npm run build
```

## Despliegue en Cloudflare

Este proyecto está configurado para ser desplegado en Cloudflare Pages:

1. Crea un proyecto en Cloudflare Pages
2. Configura el proyecto para usar:
   - Framework: Astro
   - Build command: npm run build
   - Build output directory: dist
3. Despliega tu proyecto

## Estructura del Proyecto

```
relink/
├── public/            # Archivos estáticos
├── src/
│   ├── components/    # Componentes de la UI
│   ├── db/            # Configuración de la base de datos
│   ├── layouts/       # Layouts de la aplicación
│   ├── pages/         # Páginas y endpoints de la API
│   └── utils/         # Funciones utilitarias
└── astro.config.mjs   # Configuración de Astro
```

## Licencia

Este proyecto está bajo la Licencia MIT. 