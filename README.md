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
   ```

2. Ajusta la configuración en `src/config/nats.config.ts` si es necesario.

## Uso

Para iniciar la aplicación en modo de desarrollo:

```bash
npm run start:dev
```

Para construir y ejecutar la aplicación en modo de producción:

```bash
npm run build
npm run start:prod
```

## Características principales

- Integración con NATS para comunicación entre microservicios
- Implementación de patrones de gateway en NestJS
- Manejo de solicitudes y respuestas asíncronas

## Estructura del proyecto

```
src/
├── config/         # Configuraciones de la aplicación
├── controllers/    # Controladores de NestJS
├── services/       # Servicios de lógica de negocio
├── interfaces/     # Definiciones de tipos e interfaces
├── dto/            # Objetos de transferencia de datos
└── main.ts         # Punto de entrada de la aplicación
```

## Contribución

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio
2. Crea una nueva rama (`git checkout -b feature/amazing-feature`)
3. Realiza tus cambios y haz commit (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Contacto

emanuelchusgp@gmail.com
