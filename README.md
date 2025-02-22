# Sistema de Gestión Financiera - Frontend

Aplicación web desarrollada con Angular 17 que permite gestionar usuarios y sus transacciones financieras de manera eficiente y moderna.

## Características Principales

- ✨ Interfaz minimalista y moderna
- 👥 Gestión completa de usuarios
- 💰 Control de transacciones (depósitos y retiros)
- 📊 Visualización de balance en tiempo real
- 🔔 Sistema de notificaciones toast
- 📱 Diseño responsive

## Requisitos Previos

- Node.js (v14 o superior)
- Angular CLI (v17 o superior)
- Backend API corriendo en `http://localhost:3000`

## Instalación y Configuración

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd prueba_tecnica_juliotNunez_JavaLabs_front
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
ng serve
```

4. Abrir el navegador en `http://localhost:4200`

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   └── toast/
│   │       └── toast.component.ts      # Componente de notificaciones
│   │   ├── services/
│   │   │   └── user.service.ts            # Servicio de usuarios y transacciones
│   │   │   ├── app.component.ts               # Componente principal
│   │   │   ├── app.component.html            # Template principal
│   │   │   ├── app.component.scss            # Estilos principales
│   │   │   └── app.config.ts                 # Configuración de la aplicación
│   │   └── assets/
│   └── styles/
```

## API Endpoints

### Usuarios
- `GET /users` - Obtener lista de usuarios
- `POST /users/add` - Crear nuevo usuario
```typescript
interface User {
  id?: number;
  name: string;
  email: string;
}
```

### Transacciones
- `GET /transactions/:userId` - Obtener transacciones de un usuario
- `POST /transactions` - Crear nueva transacción
```typescript
interface Transaction {
  user_id: number;
  amount: number;
  type: 'deposit' | 'withdrawal';
}
```

## Guía de Uso

### Gestión de Usuarios
1. Click en el botón "+" en el panel de usuarios
2. Completar el formulario con:
   - Nombre (mínimo 3 caracteres)
   - Email válido
3. Click en "Agregar"

### Gestión de Transacciones
1. Seleccionar un usuario de la lista
2. Click en "+" en el panel de transacciones
3. Ingresar:
   - Monto (mayor a 0)
   - Tipo de transacción (depósito/retiro)
4. Click en "Procesar"

## Comandos Disponibles

```bash
# Iniciar servidor de desarrollo
ng serve

# Compilar proyecto
ng build

# Ejecutar pruebas unitarias
ng test

# Ejecutar pruebas e2e
ng e2e
```

## Tecnologías Utilizadas

- Angular 17
- TypeScript
- SCSS
- RxJS
- Angular CLI

## Características Técnicas

- 🛠 Arquitectura standalone components
- 💉 Inyección de dependencias
- 🔄 Manejo de estado reactivo
- 📝 Formularios reactivos
- 🎨 Diseño modular con SCSS
- 🚀 Lazy loading
- ✨ Interfaces TypeScript

## Personalización

Los estilos principales se pueden modificar en `src/app/app.component.scss`:

```scss
// Variables principales
$primary-color: #2196f3;
$error-color: #f44336;
$text-color: #333;
$border-radius: 8px;
```

## Contribución

Si deseas contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Crea un Pull Request

## Soporte

Para reportar bugs o solicitar nuevas características, por favor crear un issue en el repositorio.

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
