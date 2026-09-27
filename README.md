# Acompañar · psicopedagogía

MVP en Next.js App Router, TypeScript y CSS propio para una psicopedagoga en Bahía Blanca. El contenido de ejemplo está marcado y no representa datos profesionales confirmados.

## Ejecutar

Requiere Node 20+ y pnpm.

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm build
```

Abrir `http://localhost:3000`. `pnpm lint` no se usa porque Next 15 ya no incluye el comando `next lint`; el chequeo de tipos y el build cubren la validación disponible sin agregar una dependencia de lint innecesaria.

## Variables

Copiar `.env.example` a `.env.local`. Sin credenciales, la UI corre en modo demo: las solicitudes de turno usan una colección en memoria del proceso y el catálogo no cobra. Esto es útil para revisar el flujo, pero no sirve como persistencia de producción.

## Producción

1. Crear un proyecto Supabase y ejecutar `supabase/migrations/001_initial.sql` desde el SQL Editor.
2. Completar URL, anon key y service role solo en servidor. Configurar Supabase Auth para la cuenta administradora y RLS: visitantes pueden consultar solo recursos publicados; administración usa sesión y políticas por rol.
3. Reemplazar el almacenamiento demo de `app/api/bookings/route.ts` por inserciones en `bookings`. La restricción `EXCLUDE` impide solapamientos de manera atómica y libera el espacio cuando el estado pasa a `cancelada`.
4. Crear bucket privado para recursos. Guardar solo `storage_path` y emitir signed URLs después de un pedido aprobado.
5. Configurar Mercado Pago con `MERCADOPAGO_ACCESS_TOKEN`, crear preferencias desde el servidor, guardar el pedido como `pendiente` y procesar el webhook autenticado de forma idempotente por `mp_payment_id`. Nunca entregar por la URL de retorno.
6. Completar nombre, matrícula, edades, servicios, precios, horarios, ubicación, contacto, recursos y políticas antes de publicar.

## Decisiones de costo y mantenimiento

- No se agregaron proveedores de calendario, correo ni mapas: se evitan costos y exposición de datos hasta que la profesional elija uno.
- Supabase concentra auth, base y storage, reduciendo infraestructura propia. La migración deja la regla crítica de concurrencia en PostgreSQL.
- Los pacientes no crean cuenta. Para compras se identifica al comprador por email y se entrega con enlace temporal posterior al webhook aprobado.

## Verificado en modo local

- Navegación responsive, labels y focus visible.
- Solicitud de turno con carga, éxito, error y conflicto `409` server-side.
- Catálogo con filtros y estados de contenido pendiente.
- Panel inicial, documentos legales y migración SQL preparados.

Quedan pendientes de credenciales o definición real: Supabase Auth/RLS, persistencia, correo de confirmación, Mercado Pago/webhook, signed URLs, datos profesionales y pruebas end-to-end con dos solicitudes concurrentes.
# paginaLara
