# PatitasUp

PatitasUp ahora incluye autenticación con Supabase SSR, persistencia de perfiles con Prisma sobre PostgreSQL y protección de rutas lista para desplegar en Vercel.

## Variables de entorno

Usá [.env.example](.env.example) como referencia y definí estas variables en local y en Vercel:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/patitasupdb?schema=public"
PRISMA_MIGRATE_DATABASE_URL="postgresql://postgres:your-password@db.your-project-ref.supabase.co:5432/postgres?sslmode=require"
SHADOW_DATABASE_URL="postgresql://postgres:your-shadow-password@db.your-shadow-project-ref.supabase.co:5432/postgres?sslmode=require"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your-supabase-publishable-key"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

`NEXT_PUBLIC_SUPABASE_ANON_KEY` también está soportada como fallback para proyectos viejos de Supabase.

En Prisma 7, `DIRECT_URL` ya no se usa. Este proyecto separa la conexión de runtime y la de migraciones así:

- `DATABASE_URL`: la usa la app en runtime.
- `PRISMA_MIGRATE_DATABASE_URL`: la usa Prisma CLI para `db` y `migrate`.
- `SHADOW_DATABASE_URL`: solo hace falta para `prisma migrate dev` cuando apuntás a una base cloud.

Si la contraseña de Postgres tiene caracteres reservados como `<`, `>`, `@`, `:`, `/` o `?`, tenés que percent-encodearlos en la URL.

## Puesta en marcha

```bash
pnpm install
pnpm db:generate
pnpm db:migrate --name init-auth
pnpm dev
```

Abrí `http://localhost:3000/login` o `http://localhost:3000/register`.

## Migraciones a Supabase

Si querés crear tablas en Supabase con las migraciones versionadas del proyecto, no uses `prisma migrate dev` contra producción. Lo correcto es aplicar las migraciones pendientes con la URL directa de Supabase:

```powershell
$env:PRISMA_MIGRATE_DATABASE_URL="postgresql://postgres:your-password@db.your-project-ref.supabase.co:5432/postgres?sslmode=require"
pnpm exec prisma migrate deploy
```

Si querés desarrollar migraciones directamente contra una base cloud de desarrollo, además necesitás una shadow database separada:

```powershell
$env:PRISMA_MIGRATE_DATABASE_URL="postgresql://postgres:your-password@db.your-project-ref.supabase.co:5432/postgres?sslmode=require"
$env:SHADOW_DATABASE_URL="postgresql://postgres:your-shadow-password@db.your-shadow-project-ref.supabase.co:5432/postgres?sslmode=require"
pnpm exec prisma migrate dev --name init-auth
```

## Qué hace esta implementación

- Usa `@supabase/ssr` con `middleware.ts` para refrescar cookies y proteger `/profile`.
- Ejecuta login y registro con server actions, validación con Zod y redirecciones seguras.
- Sincroniza cada usuario autenticado con la tabla `Profile` en PostgreSQL usando Prisma.
- Expone `/auth/confirm` para confirmar correo electrónico y `/auth/signout` para cerrar sesión.
- Mantiene Prisma listo para Vercel con `postinstall: prisma generate`.

## Configuración en Supabase

Configurá en Supabase Auth:

- `Site URL`: tu dominio público, por ejemplo `https://patitasup.vercel.app`
- `Redirect URLs`: `http://localhost:3000/auth/confirm` y tu dominio productivo con la misma ruta

Si tenés confirmación de email habilitada, el registro deja la cuenta creada en Supabase y Prisma, y completa la sesión cuando el usuario vuelve por `/auth/confirm`.

## Despliegue en Vercel

- Cargá las mismas variables de entorno del archivo de ejemplo.
- Asegurate de que `DATABASE_URL` apunte a PostgreSQL con pooling apto para serverless.
- Usá `PRISMA_MIGRATE_DATABASE_URL` para correr `prisma migrate deploy` contra la conexión directa de Supabase.
- Ejecutá la migración contra la base real antes de abrir el flujo de registro en producción.
