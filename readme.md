# BOOK A ROOM - BACKEND

Repositorio para el backend del proyecto de Diseño de Sistemas Web
Tibu: Reggaeton
Squad: Bad Bunny

## Instalacion

Es necesario tener instalado Node js para ejecutar el programa

Si ya tenemos Node, nos situaremos en el directorio del proyecto y ejecutaremos el siguiente comando

```bash
npm install
```

## Uso

Para ejecutar el proyecto usaremos el comando:

```bash
npm run dev
```

o tambien podemos ejecutarlo directamente

```bash
node .\index.js
```

## Rutas del API

Rutas para obtener datos de las entidades

    GET /api/reservar/v1/hotel

    GET /api/reservar/v1/usuario

    GET /api/reservar/v1/habitacion

    GET /api/reservar/v1/reserva

    GET /api/reservar/v1/hotel/{hotelId}

    GET /api/reservar/v1/reserva/{reservaId}

    GET /api/reservar/v1/usuario/{usuarioId}

    GET /api/reservar/v1/habitacion/{habitacionId}

Rutas para eliminar una entidad

    DELETE /api/reservar/v1/hotel/eliminar/{hotelId}

    DELETE /api/reservar/v1/reserva/eliminar/{reservaId}

    DELETE /api/reservar/v1/usuario/eliminar/{usuarioId}

    DEELTE /api/reservar/v1/habitacion/eliminar/{habitacionId}

Rutas para crear una entidad

    POST /api/reservar/v1/hotel/crear

```json
{
    "direccion": "av javier prado 1200",
    "niveles": 9,
    "distrito": "Magdalena",
    "ciudad": "Lima"
}
```

    POST /api/reservar/v1/habitacion/crear

```json
{
    "hotelId": 21,
    "nivel": 3,
    "aforo": 3,
    "camasPersonales": 3,
    "camasDoble": 0,
    "precio": 333
}
```

    POST /api/reservar/v1/usuario/crear

```json
{
    "nombres": "Miguel Vegas",
    "apellidos": "Vegas Santana",
    "correo": "migueleduardo@gmail.com",
    "celular": 955467417,
    "password": "miguel123"
}
```

    POST /api/reservar/v1/reserva/crear

```json
{
    "habitacionId": 7,
    "usuarioId": 14,
    "inicio": "2022-10-14",
    "fin": "2022-10-15"
}
```
