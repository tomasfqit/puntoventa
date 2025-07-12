# Sistema de Punto de Venta

Un sistema moderno de punto de venta construido con Next.js, TypeScript y Tailwind CSS.

## Características

- 🔐 **Autenticación**: Sistema de login/logout con gestión de tokens
- 🏠 **Dashboard**: Panel principal con métricas y acciones rápidas
- 📦 **Gestión de Productos**: CRUD completo de productos con búsqueda
- 🧭 **Navegación**: Sistema de navegación intuitivo entre secciones
- 📱 **Responsive**: Diseño adaptativo para diferentes dispositivos
- ⚡ **Performance**: Optimizado con Next.js 15 y Turbopack

## Estructura del Proyecto

```
src/
├── app/
│   ├── (auth)/           # Rutas de autenticación
│   │   ├── layout.tsx    # Layout para páginas de auth
│   │   └── login/        # Página de login
│   ├── (protected)/      # Rutas protegidas
│   │   ├── layout.tsx    # Layout con navegación
│   │   ├── home/         # Dashboard principal
│   │   └── products/     # Gestión de productos
│   ├── layout.tsx        # Layout raíz
│   └── page.tsx          # Página de inicio (redirección)
├── components/
│   ├── ui/               # Componentes de UI base
│   ├── Loading.tsx       # Componente de carga
│   └── Navigation.tsx    # Barra de navegación
├── hooks/
│   └── useAuth.ts        # Hook de autenticación
├── api/
│   └── config.ts         # Configuración de API y tokens
└── lib/
    └── auth.ts           # Utilidades de autenticación
```

## Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd puntoventa
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## Uso del Sistema

### Autenticación
- **Login**: Ingresa cualquier usuario y contraseña para acceder
- **Logout**: Usa el botón "Cerrar Sesión" en la barra de navegación
- **Protección**: Las rutas están protegidas automáticamente

### Navegación
- **Dashboard**: Vista principal con métricas y acciones rápidas
- **Productos**: Gestión completa del inventario
- **Navegación**: Barra superior con acceso a todas las secciones

### Gestión de Productos
- **Ver productos**: Lista completa con búsqueda
- **Eliminar**: Botón de eliminar en cada producto
- **Búsqueda**: Filtrado por nombre o categoría
- **Stock**: Indicadores visuales de nivel de inventario

## Tecnologías Utilizadas

- **Next.js 15**: Framework de React con App Router
- **TypeScript**: Tipado estático para mejor desarrollo
- **Tailwind CSS**: Framework de CSS utilitario
- **Lucide React**: Iconos modernos
- **Radix UI**: Componentes de UI accesibles

## Scripts Disponibles

- `npm run dev`: Ejecuta el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Ejecuta la aplicación en modo producción
- `npm run lint`: Ejecuta el linter para verificar código

## Estado del Proyecto

✅ **Completado**:
- Sistema de autenticación
- Navegación entre rutas
- Dashboard funcional
- Gestión de productos
- Diseño responsive

🔄 **En desarrollo**:
- Integración con API real
- Sistema de ventas
- Reportes y estadísticas
- Gestión de usuarios

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
