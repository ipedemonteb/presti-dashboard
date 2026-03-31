# Presti Dashboard - HACKITBA 2026

El presente trabajo, desarrollado en el marco de *HACKITBA 2026*, hackathon organizada por el *Computer Society del ITBA*, consiste en la construccion del frontend web de `presti`, una plataforma pensada para fintechs que necesitan visualizar, configurar y operar un motor de decision crediticia desde una interfaz clara y moderna.

La aplicacion centraliza autenticacion, analiticas, configuracion de politica crediticia, administracion de productos, consultas puntuales por CUIL, seguimiento de cartera y gestion de accesos de integracion.

Cuenta principalmente con las siguientes funcionalidades:

- <b>Landing Pública</b>: Se presenta la propuesta de valor del producto, sus principales capacidades, el enfoque del proyecto y una seccion de pricing orientada a fintechs.

- <b>Autenticación</b>: Se permite a los usuarios registrarse, iniciar sesion y mantener su sesion autenticada mediante JWT.

- <b>Analytics Operativos</b>: Se ofrece una vista consolidada con metricas de uso, tasa de aprobacion, volumen de productos, usuarios cargados y recomendaciones recientes.

- <b>Gestión de Productos</b>: Se permite crear, editar y eliminar productos financieros, diferenciando entre prestamos, microprestamos y tarjetas de credito.

- <b>Política Crediticia Configurable</b>: Se ofrece una interfaz para ajustar criterios de elegibilidad como situacion crediticia, deuda externa, historial limpio y cantidad de entidades con deuda.

- <b>Consulta por CUIL</b>: Se permite generar recomendaciones puntuales para un cliente especifico y visualizar los resultados recientes devueltos por la API.

- <b>Seguimiento de Cartera</b>: Se visualizan cambios en la situacion crediticia de clientes monitoreados, incluyendo mejoras, deterioros y filtros por tipo de evento.

- <b>Configuración e Integraciones</b>: Se ofrece acceso a informacion de suscripcion, uso diario, planes disponibles, API keys, seguridad y preferencias visuales.

<details>
  <summary>Contenidos</summary>
  <ol>
    <li><a href="#instalación">Instalación</a></li>
    <li><a href="#secciones-principales">Secciones Principales</a></li>
    <li><a href="#usuario-de-prueba">Usuario de Prueba</a></li>
    <li><a href="#arquitectura-e-integración">Arquitectura e Integración</a></li>
    <li><a href="#estado-actual">Estado Actual</a></li>
    <li><a href="#integrantes">Integrantes</a></li>
  </ol>
</details>

## Instalación:

Para la ejecucion local del proyecto se requiere tener instalado **Node.js** y **npm**.

Se debe clonar el repositorio mediante:

- HTTPS:
```sh
git clone https://github.com/[usuario]/presti-dashboard.git
```

- SSH:
```sh
git clone git@github.com:[usuario]/presti-dashboard.git
```

Luego, dentro del proyecto, se deben instalar las dependencias:

```sh
npm install
```

Crear un archivo `.env` en la raiz del proyecto para configurar la conexion con la API:

```env
VITE_API_ORIGIN=https://tu-api.com
VITE_API_URL=https://tu-api.com
```

> Aclaracion: en desarrollo, Vite utiliza `VITE_API_ORIGIN` para resolver el proxy local en `/api`. En produccion, el cliente HTTP utiliza `VITE_API_URL` como base publica de la API.

Finalmente, ejecutar el entorno de desarrollo:

```sh
npm run dev
```

La aplicacion estara disponible en `http://localhost:5173`.

Para generar el build de produccion se debe ejecutar:

```sh
npm run build
```

De forma adicional, el proyecto incluye los siguientes scripts:

```sh
npm run lint
npm run preview
```

<p align="right"><a href="#presti-dashboard---hackitba-2026">Volver</a></p>

## Secciones Principales:

La aplicacion se divide en una parte publica y una parte privada orientada a la operacion diaria.

### Landing Pública:

Disponible en la ruta `/`, funciona como puerta de entrada comercial del producto.

Incluye:

- `Header` con navegacion principal.
- `Hero` con la propuesta de valor de presti.
- `Features` con las capacidades centrales de la plataforma.
- `About` con la mision, enfoque y vision del proyecto.
- `Pricing` con planes Pro, Business y Enterprise.
- `Footer` con cierre institucional y accesos complementarios.

### Login y Registro:

Las rutas `/login`, `/register` y `/forgot-password` cubren los flujos de acceso.

- <b>Login</b>: permite autenticar usuarios existentes.
- <b>Registro</b>: permite dar de alta una nueva cuenta.
- <b>Recuperación de Contraseña</b>: ofrece una interfaz simple para iniciar el flujo de recuperacion.

### Dashboard:

Disponible bajo la ruta base `/dashboard`, constituye el area privada de operacion y utiliza un layout comun con sidebar, header superior y proteccion por autenticacion.

Dentro del dashboard hoy existen las siguientes secciones:

- <b>Analytics</b>: muestra consultas del dia, tasa de aprobacion, monto maximo promedio, usuarios cargados, recomendaciones recientes y resumen de cartera.

- <b>Parámetros</b>: permite editar la politica crediticia general mediante reglas como maxima situacion permitida, historial limpio requerido, deuda total externa maxima y cantidad maxima de entidades con deuda.

- <b>Productos</b>: permite listar, crear, editar y eliminar productos financieros, adaptando los campos segun si se trata de un prestamo, microprestamo o tarjeta de credito.

- <b>Cartera</b>: muestra clientes monitoreados, mejoras y deterioros detectados, junto con el detalle de los cambios de situacion crediticia.

- <b>Query</b>: permite ingresar un CUIL valido para generar una recomendacion puntual y visualizar hasta cinco resultados recientes asociados a esa consulta.

- <b>Configuración</b>: centraliza informacion del usuario autenticado, suscripcion activa, uso diario, planes disponibles, API keys, seguridad y apariencia.

### Página 404:

La ruta comodin `*` resuelve una vista de respaldo para accesos a rutas no existentes.

<p align="right"><a href="#presti-dashboard---hackitba-2026">Volver</a></p>

## Usuario de Prueba:

Para facilitar la exploracion de la aplicacion, se incluye un usuario de demo con las siguientes credenciales.

### Usuario Demo:

- **Email:** demo.hackathon@presti.local
- **Contraseña:** Hackaton2026!

<p align="right"><a href="#presti-dashboard---hackitba-2026">Volver</a></p>

## Arquitectura e Integración:

La aplicacion sigue una estructura simple y mantenible, separando router, vistas, componentes reutilizables, tipos y acceso a datos.

```text
src/
  app/            Router y configuracion global
  components/     Layouts, providers y componentes reutilizables
  components/ui/  Componentes base de shadcn/ui
  lib/            Cliente HTTP, helpers y servicios
  pages/          Pantallas asociadas a rutas
  types/          Tipos compartidos de auth y recursos API
```

La integracion con la API se realiza mediante `axios`, principalmente desde `src/lib/dashboard-service.ts` y `src/lib/auth.ts`.

Entre los recursos consumidos por el frontend se encuentran:

- autenticacion
- productos
- usuarios
- recomendaciones
- politica crediticia
- cartera y tamano de cartera
- suscripciones y uso diario
- API keys del cliente

El cliente HTTP agrega automaticamente el token JWT guardado en `localStorage` y redirige al login ante respuestas `401`.

Ademas, el proyecto incluye:

- <b>AuthProvider</b>: expone el estado global de sesion.
- <b>ProtectedRoute</b>: protege las rutas privadas del dashboard.
- <b>ThemeProvider</b>: permite cambiar entre modo claro, oscuro y sistema.

<p align="right"><a href="#presti-dashboard---hackitba-2026">Volver</a></p>

## Estado Actual:

El frontend ya cubre los flujos principales de visualizacion y configuracion del producto, aunque hay algunas consideraciones de implementacion a tener en cuenta:

- el login y el registro crean un usuario local temporal a partir de los datos devueltos por autenticacion
- la recuperacion de contrasena todavia no esta conectada a un endpoint real
- algunas preferencias de configuracion son locales o visuales y no necesariamente persistidas por API

El proyecto esta orientado especialmente a equipos de producto, riesgo y operacion dentro de fintechs, asi como a desarrolladores que necesiten una base frontend para integrarse con la API de presti.

<p align="right"><a href="#presti-dashboard---hackitba-2026">Volver</a></p>

## Integrantes:

Equipo desarrollador de Presti Dashboard para HACKITBA 2026.

Martín Alejando Barnatán (martin.barnatan.dev@gmail.com)

Juan Pablo Birsa (juanbirsa@gmail.com)

Ignacio Pedemonte Berthoud (ipedemonteb@gmail.com)

Pedro Salinas (psalinas351@gmail.com)


<p align="right"><a href="#presti-dashboard---hackitba-2026">Volver</a></p>
