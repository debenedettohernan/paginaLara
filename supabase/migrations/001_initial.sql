create extension if not exists "pgcrypto";
create type booking_status as enum ('pendiente','confirmada','cancelada','completada');
create type order_status as enum ('pendiente','aprobado','rechazado');
create table services (id uuid primary key default gen_random_uuid(), name text not null, description text, duration_minutes integer not null, price_ars integer, active boolean default false);
create table availability_rules (id uuid primary key default gen_random_uuid(), weekday smallint not null, start_time time not null, end_time time not null, mode text not null, active boolean default true);
create table bookings (id uuid primary key default gen_random_uuid(), service_id uuid references services, starts_at timestamptz not null, ends_at timestamptz not null, mode text not null, name text not null, email text not null, phone text, note text, status booking_status not null default 'pendiente', created_at timestamptz not null default now());
alter table bookings add constraint bookings_no_overlap exclude using gist (tstzrange(starts_at, ends_at, '[)') with &&) where (status <> 'cancelada');
create table resources (id uuid primary key default gen_random_uuid(), title text not null, slug text unique not null, description text, audience text, age_range text, area text, format text, price_ars integer, storage_path text, published boolean default false, created_at timestamptz default now());
create table orders (id uuid primary key default gen_random_uuid(), resource_id uuid references resources not null, buyer_email text not null, buyer_name text not null, amount_ars integer not null, mp_payment_id text unique, status order_status not null default 'pendiente', delivery_token_hash text, created_at timestamptz default now());
alter table bookings enable row level security; alter table orders enable row level security; alter table resources enable row level security;
create policy "published resources are public" on resources for select using (published = true);
-- Las mutaciones y lecturas administrativas deben usar Supabase Auth + rol validado en servidor.
