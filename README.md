# Demo de API de Harry Potter

Aplicación frontend que muestra el flujo de peticiones HTTP a una API externa de Harry Potter.

## Instalación

```bash
npm install
```

## Ejecutar

```bash
npm run dev
```

La aplicación estará disponible en http://localhost:5173

## API Utilizada

Esta aplicación consume la API pública de Harry Potter:
- Base URL: https://potterapi-fedeperin.vercel.app/es
- Documentación: https://github.com/fedeperin/potterapi

## Endpoints utilizados

- `GET /characters/random` - Obtiene un personaje aleatorio
- `GET /characters?search=:nombre` - Busca personajes por nombre
- `GET /spells/random` - Obtiene un hechizo aleatorio
- `GET /characters?index=:id` - Obtiene un personaje específico (usado para duelos)

## Características

- Visualización del flujo completo de cada petición HTTP
- Interfaz temática de Harry Potter
- Cambio de color de fondo con cada respuesta exitosa
- Imágenes reales de personajes
- Sistema de duelos entre personajes
