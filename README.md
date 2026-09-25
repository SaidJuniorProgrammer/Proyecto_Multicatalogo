# MultiCatalogo

Aplicacion web de catalogo de productos cosmeticos con autenticacion por roles, carrito persistente, checkout y red multinivel de referidos.

## Tecnologias

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React
- ESLint

### Backend

- Go 1.26
- Fiber v2
- API REST
- CORS para `http://localhost:5173`

## Estructura del proyecto

```text
Proyecto_MultiCatalogo/
|
|-- README.md
|-- Guia_Practica_Tema5_leccion.md
|
|-- multicatalogo-backend/
|   |-- go.mod
|   |-- main.go
|   |-- controllers/
|   |   |-- authController.go
|   |   `-- prodController.go
|   |-- models/
|   |   `-- models.go
|   `-- routes/
|       `-- routes.go
|
`-- Practica03/
    |-- package.json
    |-- package-lock.json
    |-- index.html
    |-- vite.config.ts
    |-- tsconfig.json
    |-- tsconfig.app.json
    |-- tsconfig.node.json
    |-- eslint.config.js
    |-- public/
    `-- src/
        |-- main.tsx
        |-- App.tsx
        |-- index.css
        |
        |-- components/
        |   |-- Login.tsx
        |   |-- Layout.tsx
        |   |-- Navbar.tsx
        |   |-- Sidebar.tsx
        |   |-- Dashboard.tsx
        |   |-- Storefront.tsx
        |   |-- Catalogo.tsx
        |   |-- DetalleProducto.tsx
        |   |-- Carrito.tsx
        |   |-- Checkout.tsx
        |   |-- Confirmacion.tsx
        |   `-- MiRed.tsx
        |
        |-- context/
        |   |-- AuthContext.tsx
        |   `-- CartContext.tsx
        |
        |-- data/
        |   |-- productos.ts
        |   `-- red.ts
        |
        `-- services/
            `-- productosService.ts
```

## Requisitos

Instalar previamente:

- Go 1.26 o superior
- Node.js y npm
- Un navegador moderno

## Instalacion

### Backend

Desde la raiz del proyecto:

```powershell
cd .\multicatalogo-backend

go mod download
```

### Frontend

```powershell
cd ..\Practica03
npm install
```

## Ejecucion

El backend y el frontend deben ejecutarse en terminales separadas.

### Terminal 1: backend

```powershell
cd "C:\Users\said2\framework\Proyecto_MultiCatalogo\multicatalogo-backend"
go run .
```

El backend queda disponible en:

```text
http://localhost:3000
```

Debe mostrar una salida de Fiber indicando el puerto 3000. No ejecutes `go run .` desde la carpeta raiz, porque alli no existe `go.mod`.

### Terminal 2: frontend

```powershell
cd "C:\Users\said2\framework\Proyecto_MultiCatalogo\Practica03"
npm run dev
```

Abrir en el navegador:

```text
http://localhost:5173
```

## Cuentas de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | `admin@upse.edu.ec` | `123456` |
| Cliente | `cliente@upse.edu.ec` | `123456` |

## API

### Login

```http
POST http://localhost:3000/api/login
Content-Type: application/json
```

Ejemplo de solicitud:

```json
{
  "email": "admin@upse.edu.ec",
  "password": "123456"
}
```

Respuesta de administrador:

```json
{
  "token": "fake-jwt-token-123",
  "email": "admin@upse.edu.ec",
  "rol": "admin"
}
```

Respuesta de cliente:

```json
{
  "token": "fake-jwt-token-456",
  "email": "cliente@upse.edu.ec",
  "rol": "cliente"
}
```

### Productos

```http
GET http://localhost:3000/api/productos
```

El backend devuelve productos basicos hardcodeados. El frontend utiliza actualmente `src/data/productos.ts` mediante `src/services/productosService.ts`, preparado para reemplazarse por una llamada real a la API.

## Rutas del frontend

| Ruta | Acceso | Funcion |
|---|---|---|
| `/login` | Publico | Inicio de sesion |
| `/` | Solo admin | Dashboard con KPIs |
| `/tienda` | Admin y cliente | Storefront full-screen |
| `/catalogo` | Admin y cliente | Busqueda, filtros y ordenamiento |
| `/producto/:id` | Admin y cliente | Detalle, galeria y lightbox |
| `/carrito` | Admin y cliente | Carrito persistente |
| `/checkout` | Admin y cliente | Formulario de compra |
| `/confirmacion` | Admin y cliente | Confirmacion del pedido |
| `/mi-red` | Solo admin | Arbol de referidos y comisiones |

## Funcionalidades

- Autenticacion contra la API Go/Fiber.
- Roles `admin` y `cliente`.
- Redireccion segun el rol despues del login.
- Proteccion de rutas privadas.
- Dashboard con KPIs derivados de la red multinivel.
- Storefront con hero visual y productos destacados.
- Catalogo con busqueda, filtro por categoria y ordenamiento por precio.
- URL compartible para filtros, por ejemplo `?categoria=Serum`.
- Detalle dinamico con `useParams`.
- Galeria de imagenes y lightbox con navegacion y tecla Escape.
- Carrito guardado en `localStorage` por correo de usuario.
- Aumento, disminucion y eliminacion de cantidades.
- Checkout simulado y confirmacion con numero de pedido.
- Arbol recursivo de referidos.
- Comisiones calculadas por nivel:
  - Nivel 1: 10 %
  - Nivel 2: 5 %
  - Nivel 3: 2 %

## Persistencia del carrito

Cada usuario tiene una clave independiente en `localStorage`:

```text
multicat_cart_admin@upse.edu.ec
multicat_cart_cliente@upse.edu.ec
```

Por eso el carrito del administrador no se mezcla con el carrito del cliente.

## Comandos de verificacion

### Frontend

```powershell
cd "C:\Users\said2\framework\Proyecto_MultiCatalogo\Practica03"
npm run lint
npm run build
```

`npm run lint` puede mostrar advertencias de Fast Refresh en los contextos. No hay errores bloqueantes.

### Backend

```powershell
cd "C:\Users\said2\framework\Proyecto_MultiCatalogo\multicatalogo-backend"
go build ./...
```

## Prueba manual recomendada

1. Iniciar el backend en el puerto 3000.
2. Iniciar el frontend en el puerto 5173.
3. Entrar como administrador y comprobar Dashboard, Tienda, Catalogo y Mi Red.
4. Cerrar sesion.
5. Entrar como cliente y comprobar que inicia en `/tienda`.
6. Agregar un producto al carrito.
7. Recargar la pagina y comprobar que el carrito persiste.
8. Ir a Checkout y confirmar el pedido.
9. Comprobar que aparece la confirmacion y el carrito queda vacio.
10. Cerrar sesion, entrar con el administrador y verificar que su carrito es independiente.

## Solucion de problemas

### `go: cannot find main module`

Estas en la carpeta incorrecta. Ejecuta:

```powershell
cd "C:\Users\said2\framework\Proyecto_MultiCatalogo\multicatalogo-backend"
go run .
```

### El puerto 3000 ya esta ocupado

Puede que el backend ya este funcionando. Compruebalo con:

```powershell
Get-NetTCPConnection -LocalPort 3000 -State Listen
```

No ejecutes otra instancia mientras el puerto este ocupado.

### El frontend no conecta con el backend

Comprueba que:

- el backend este activo en `http://localhost:3000`;
- el frontend este activo en `http://localhost:5173`;
- la consola del navegador no muestre errores de CORS;
- no haya otra aplicacion ocupando el puerto 3000.

## Estado del proyecto

El proyecto esta preparado para la entrega de la Practica 03. La autenticacion y los productos del backend utilizan datos de demostracion; la persistencia real con PostgreSQL y JWT queda para una unidad posterior.
