# Portfolio Rosario

Proyecto base configurado con Vite, React, TypeScript y Tailwind CSS.

## 🚀 Inicio rápido

### Instalación

```bash
pnpm install
```

### Desarrollo

```bash
pnpm dev
```

El servidor de desarrollo se iniciará en `http://localhost:5173`

### Build

```bash
pnpm build
```

### Preview

```bash
pnpm preview
```

## 🛠️ Stack tecnológico

- **Vite** - Build tool y dev server
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de utilidades CSS
- **React Router DOM** - Enrutamiento de la aplicación
- **Lenis** - Scroll suave y fluido
- **pnpm** - Gestor de paquetes
- **ESLint** - Linter para mantener calidad de código

## 📁 Estructura del proyecto

```
portfolio-rosario/
├── src/
│   ├── pages/
│   │   ├── Home.tsx      # Página principal
│   │   └── Project.tsx   # Página dinámica de proyecto
│   ├── App.tsx           # Componente principal con rutas
│   ├── main.tsx          # Punto de entrada
│   ├── index.css         # Estilos globales con Tailwind
│   └── vite-env.d.ts     # Tipos de Vite
├── index.html            # HTML base
├── vite.config.ts        # Configuración de Vite
├── tailwind.config.js    # Configuración de Tailwind
├── postcss.config.js     # Configuración de PostCSS
├── tsconfig.json         # Configuración de TypeScript
└── .npmrc                # Configuración de pnpm
```

## 🛣️ Rutas

- `/` - Página principal (Home)
- `/project/:projectId` - Página dinámica de cada proyecto

## 🎨 Tailwind CSS

Tailwind está configurado y listo para usar. Puedes empezar a usar las clases de utilidad directamente en tus componentes.

Ejemplo:
```tsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Hola mundo
</div>
```

## 📜 Scroll Suave con Lenis

Lenis está configurado y activo en toda la aplicación, proporcionando transiciones suaves al hacer scroll.

### Uso del hook useLenis

Si necesitas controlar el scroll programáticamente, puedes usar el hook `useLenis`:

```tsx
import { useLenis } from "@studio-freight/react-lenis";

function MyComponent() {
  const lenis = useLenis();

  const scrollToTop = () => {
    lenis?.scrollTo(0, { duration: 1.5 });
  };

  const scrollToElement = (selector: string) => {
    lenis?.scrollTo(selector, { duration: 1.5 });
  };

  return (
    <button onClick={scrollToTop}>
      Ir al inicio
    </button>
  );
}
```

### Configuración personalizada

Si necesitas personalizar la configuración de Lenis, puedes modificar el componente `ReactLenis` en `App.tsx`:

```tsx
<ReactLenis
  root
  options={{
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  }}
>
  {/* Tu aplicación */}
</ReactLenis>
```

