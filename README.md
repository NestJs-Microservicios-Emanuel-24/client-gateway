# Cliente Gateway

## Descripción

Este proyecto implementa un cliente gateway utilizando NestJS, diseñado para interactuar con un servidor NATS. Proporciona una capa de abstracción para la comunicación entre microservicios a través del protocolo NATS.

## Requisitos previos

- Node.js (versión 14 o superior)
- npm o yarn
- Docker (para ejecutar el servidor NATS)

## Configuración del entorno

### Servidor NATS

Para ejecutar el servidor NATS localmente, utiliza el siguiente comando de Docker:

```bash
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```

Este comando iniciará un contenedor Docker con el servidor NATS, exponiendo los puertos 4222 (para comunicación de clientes) y 8222 (para monitoreo HTTP).

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/cliente-gateway.git
   cd cliente-gateway
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias:

   ```
   NATS_URL=nats://localhost:4222
   PORT=3000
   ```

## Uso

Para iniciar la aplicación en modo de desarrollo:

```bash
npm run start:dev
```

## PROD

crear imagen docker mutistage optimizada, ejecutar

# docker build -f dockerfile.prod client-gateway .

## Contacto

emanuelchusgp@gmail.com
