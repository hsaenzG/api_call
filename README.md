# 🪄 Demo de API de Harry Potter

Aplicación frontend interactiva que visualiza el flujo completo de peticiones HTTP a una API externa de Harry Potter. Perfecta para entender cómo funcionan las APIs REST y la comunicación cliente-servidor.

## ✨ Características

- 📡 **Visualización del flujo HTTP**: Cada petición muestra el ciclo completo (Frontend → Request → API → Response → Frontend)
- 🎨 **Interfaz temática mágica**: Diseño inspirado en el mundo de Harry Potter con efectos visuales
- 🌈 **Cambio dinámico de colores**: El fondo cambia con cada respuesta exitosa
- 🖼️ **Imágenes reales**: Muestra fotos de los personajes de las películas
- ⚡ **Sistema de duelos**: Compara el poder de dos personajes

## 🚀 Instalación

```bash
# Clonar el repositorio
gh repo clone hsaenzG/api_call

# Instalar dependencias
npm install
```

## 💻 Ejecutar

```bash
npm run dev
```

La aplicación estará disponible en http://localhost:5173

## 🔮 API Utilizada

Esta aplicación consume la API pública de Harry Potter:
- **Base URL**: `https://potterapi-fedeperin.vercel.app/es`
- **Documentación**: [GitHub - PotterAPI](https://github.com/fedeperin/potterapi)

## 📚 Endpoints Implementados

### 1. GET /characters/random
Obtiene un personaje aleatorio del universo de Harry Potter.

**Respuesta incluye:**
- Nombre completo
- Apodo
- Casa de Hogwarts
- Actor/Actriz que lo interpretó
- Fecha de nacimiento
- Imagen

### 2. GET /characters?search=:nombre
Busca personajes por nombre.

**Parámetros:**
- `search`: Término de búsqueda (ej: "Harry", "Hermione")

### 3. GET /spells/random
Obtiene un hechizo aleatorio.

**Respuesta incluye:**
- Nombre del hechizo
- Descripción de su uso

### 4. GET /characters?index=:id (Duelo)
Obtiene personajes específicos por índice para simular duelos mágicos.

**Parámetros:**
- `index`: Índice del personaje (0-n)

**Personajes disponibles para duelos:**
- 0: Harry Potter
- 1: Hermione Granger
- 2: Ron Weasley
- 3: Draco Malfoy
- 4: Albus Dumbledore
- 5: Severus Snape
- 10: Lord Voldemort
- 15: Sirius Black

## 🎯 Funcionalidades

### Visualización del Flujo HTTP

Cada petición muestra un diagrama interactivo con 4 etapas:

1. **Frontend** - Envía la petición
2. **Request** - Datos viajando por la red (muestra el payload)
3. **API Externa** - Servidor procesando
4. **Response** - Datos de vuelta (muestra la respuesta JSON)

Las cards se iluminan secuencialmente mostrando el progreso en tiempo real.

### Sistema de Duelos

Compara dos personajes basándose en:
- Longitud del nombre (poder base)
- Factor aleatorio (suerte en el duelo)
- Resultado visual con imágenes y estadísticas

## 🛠️ Tecnologías

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **CSS3** - Estilos con efectos mágicos
- **Fetch API** - Peticiones HTTP

## 📁 Estructura del Proyecto

```
├── src/
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos temáticos
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── index.html           # HTML base
├── package.json         # Dependencias
├── vite.config.js       # Configuración de Vite
└── README.md           # Documentación
```

## 🎨 Características Visuales

- **Gradientes dinámicos**: 6 combinaciones de colores que cambian automáticamente
- **Animaciones suaves**: Transiciones y efectos de pulso
- **Diseño responsive**: Adaptable a diferentes tamaños de pantalla
- **Tema oscuro mágico**: Colores dorados y morados inspirados en Hogwarts
- **Efectos de brillo**: Text-shadow y box-shadow para efecto mágico

## 🚢 Despliegue

Esta aplicación es 100% frontend y puede desplegarse en:

- **Vercel**: `vercel deploy`
- **Netlify**: Arrastra la carpeta `dist` después de `npm run build`
- **GitHub Pages**: Configura el workflow de GitHub Actions
- **Cloudflare Pages**: Conecta tu repositorio

### Build para producción

```bash
npm run build
```

Esto generará la carpeta `dist/` lista para desplegar.

## 📝 Notas

- La API es pública y no requiere autenticación
- Los datos están en español
- Las imágenes provienen de fuentes oficiales
- El cálculo de duelos es simulado (no oficial)

## 🤝 Contribuir

Si quieres mejorar este proyecto:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🙏 Créditos

- **API de Harry Potter**: [fedeperin/potterapi](https://github.com/fedeperin/potterapi)
- **Imágenes**: Warner Bros. y fuentes oficiales
- **Inspiración**: El maravilloso mundo mágico de J.K. Rowling

---

Hecho con ⚡ y magia por Hazel Saenz
