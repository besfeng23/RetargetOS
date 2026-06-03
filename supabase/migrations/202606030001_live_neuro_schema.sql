-- RetargetOS live Supabase schema for Neuro (project qlzcqzqbcjioweatllhi).
create extension if not exists pgcrypto;

create or replace function public.is_admin() returns boolean language sql stable as $$ select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin' $$;

create table if not exists public.data_sources (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null default auth.uid(),
  owner_id uuid not null default auth.uid(),
  name text not null, source_type text not null, owner text, risk text not null default 'needs_review', consent_default text not null default 'unknown', allowed_use text not null, status text not null default 'needs_review',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.data_sources enable row level security;

drop policy if exists "data_sources_select_authenticated" on public.data_sources;
create policy "data_sources_select_authenticated" on public.data_sources for select to authenticated using (true);
drop policy if exists "data_sources_insert_authenticated" on public.data_sources;
create policy "data_sources_insert_authenticated" on public.data_sources for insert to authenticated with check (owner_id = auth.uid() and tenant_id = auth.uid());
drop policy if exists "data_sources_update_owner_or_admin" on public.data_sources;
create policy "data_sources_update_owner_or_admin" on public.data_sources for update to authenticated using (owner_id = auth.uid() or public.is_admin()) with check (owner_id = auth.uid() or public.is_admin());
drop policy if exists "data_sources_delete_admin_only" on public.data_sources;
create policy "data_sources_delete_admin_only" on public.data_sources for delete to authenticated using (public.is_admin());

create index if not exists data_sources_tenant_id_idx on public.data_sources (tenant_id);
create index if not exists data_sources_created_at_idx on public.data_sources (created_at desc);
create index if not exists data_sources_risk_idx on public.data_sources (risk);
create index if not exists data_sources_status_idx on public.data_sources (status);

create table if not exists public.import_jobs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null default auth.uid(),
  owner_id uuid not null default auth.uid(),
  batch_name text not null, source_name text not null, status text not null default 'draft', total_rows integer not null default 0, accepted_rows integer not null default 0, quarantined_rows integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.import_jobs enable row level security;

drop policy if exists "import_jobs_select_authenticated" on public.import_jobs;
create policy "import_jobs_select_authenticated" on public.import_jobs for select to authenticated using (true);
drop policy if exists "import_jobs_insert_authenticated" on public.import_jobs;
create policy "import_jobs_insert_authenticated" on public.import_jobs for insert to authenticated with check (owner_id = auth.uid() and tenant_id = auth.uid());
drop policy if exists "import_jobs_update_owner_or_admin" on public.import_jobs;
create policy "import_jobs_update_owner_or_admin" on public.import_jobs for update to authenticated using (owner_id = auth.uid() or public.is_admin()) with check (owner_id = auth.uid() or public.is_admin());
drop policy if exists "import_jobs_delete_admin_only" on public.import_jobs;
create policy "import_jobs_delete_admin_only" on public.import_jobs for delete to authenticated using (public.is_admin());

create index if not exists import_jobs_tenant_id_idx on public.import_jobs (tenant_id);
create index if not exists import_jobs_created_at_idx on public.import_jobs (created_at desc);
create index if not exists import_jobs_status_idx on public.import_jobs (status);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null default auth.uid(),
  owner_id uuid not null default auth.uid(),
  profile_key text not null, lifecycle text not null default 'unknown', consent text not null default 'unknown', suppression text not null default 'not_suppressed', risk text not null default 'medium', identity_keys text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_authenticated" on public.profiles;
create policy "profiles_select_authenticated" on public.profiles for select to authenticated using (true);
drop policy if exists "profiles_insert_authenticated" on public.profiles;
create policy "profiles_insert_authenticated" on public.profiles for insert to authenticated with check (owner_id = auth.uid() and tenant_id = auth.uid());
drop policy if exists "profiles_update_owner_or_admin" on public.profiles;
create policy "profiles_update_owner_or_admin" on public.profiles for update to authenticated using (owner_id = auth.uid() or public.is_admin()) with check (owner_id = auth.uid() or public.is_admin());
drop policy if exists "profiles_delete_admin_only" on public.profiles;
create policy "profiles_delete_admin_only" on public.profiles for delete to authenticated using (public.is_admin());

create index if not exists profiles_tenant_id_idx on public.profiles (tenant_id);
create index if not exists profiles_created_at_idx on public.profiles (created_at desc);
create index if not exists profiles_consent_idx on public.profiles (consent);
create index if not exists profiles_suppression_idx on public.profiles (suppression);
create index if not exists profiles_risk_idx on public.profiles (risk);

create table if not exists public.consent_rules (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null default auth.uid(),
  owner_id uuid not null default auth.uid(),
  rule_type text not null, status text not null default 'unknown', action text not null, risk text not null default 'high', source text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.consent_rules enable row level security;

drop policy if exists "consent_rules_select_authenticated" on public.consent_rules;
create policy "consent_rules_select_authenticated" on public.consent_rules for select to authenticated using (true);
drop policy if exists "consent_rules_insert_authenticated" on public.consent_rules;
create policy "consent_rules_insert_authenticated" on public.consent_rules for insert to authenticated with check (owner_id = auth.uid() and tenant_id = auth.uid());
drop policy if exists "consent_rules_update_owner_or_admin" on public.consent_rules;
create policy "consent_rules_update_owner_or_admin" on public.consent_rules for update to authenticated using (owner_id = auth.uid() or public.is_admin()) with check (owner_id = auth.uid() or public.is_admin());
drop policy if exists "consent_rules_delete_admin_only" on public.consent_rules;
create policy "consent_rules_delete_admin_only" on public.consent_rules for delete to authenticated using (public.is_admin());

create index if not exists consent_rules_tenant_id_idx on public.consent_rules (tenant_id);
create index if not exists consent_rules_created_at_idx on public.consent_rules (created_at desc);
create index if not exists consent_rules_status_idx on public.consent_rules (status);
create index if not exists consent_rules_risk_idx on public.consent_rules (risk);

create table if not exists public.audiences (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null default auth.uid(),
  owner_id uuid not null default auth.uid(),
  name text not null, preset text, total_count integer not null default 0, eligible_count integer not null default 0, suppressed_count integer not null default 0, status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.audiences enable row level security;

drop policy if exists "audiences_select_authenticated" on public.audiences;
create policy "audiences_select_authenticated" on public.audiences for select to authenticated using (true);
drop policy if exists "audiences_insert_authenticated" on public.audiences;
create policy "audiences_insert_authenticated" on public.audiences for insert to authenticated with check (owner_id = auth.uid() and tenant_id = auth.uid());
drop policy if exists "audiences_update_owner_or_admin" on public.audiences;
create policy "audiences_update_owner_or_admin" on public.audiences for update to authenticated using (owner_id = auth.uid() or public.is_admin()) with check (owner_id = auth.uid() or public.is_admin());
drop policy if exists "audiences_delete_admin_only" on public.audiences;
create policy "audiences_delete_admin_only" on public.audiences for delete to authenticated using (public.is_admin());

create index if not exists audiences_tenant_id_idx on public.audiences (tenant_id);
create index if not exists audiences_created_at_idx on public.audiences (created_at desc);
create index if not exists audiences_status_idx on public.audiences (status);

create table if not exists public.destinations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null default auth.uid(),
  owner_id uuid not null default auth.uid(),
  platform text not null, mode text not null default 'approval_required', status text not null default 'not_connected', last_sync_status text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.destinations enable row level security;

drop policy if exists "destinations_select_authenticated" on public.destinations;
create policy "destinations_select_authenticated" on public.destinations for select to authenticated using (true);
drop policy if exists "destinations_insert_authenticated" on public.destinations;
create policy "destinations_insert_authenticated" on public.destinations for insert to authenticated with check (owner_id = auth.uid() and tenant_id = auth.uid());
drop policy if exists "destinations_update_owner_or_admin" on public.destinations;
create policy "destinations_update_owner_or_admin" on public.destinations for update to authenticated using (owner_id = auth.uid() or public.is_admin()) with check (owner_id = auth.uid() or public.is_admin());
drop policy if exists "destinations_delete_admin_only" on public.destinations;
create policy "destinations_delete_admin_only" on public.destinations for delete to authenticated using (public.is_admin());

create index if not exists destinations_tenant_id_idx on public.destinations (tenant_id);
create index if not exists destinations_created_at_idx on public.destinations (created_at desc);
create index if not exists destinations_mode_idx on public.destinations (mode);
create index if not exists destinations_status_idx on public.destinations (status);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null default auth.uid(),
  owner_id uuid not null default auth.uid(),
  name text not null, price numeric(12,2) not null default 0, cost numeric(12,2) not null default 0, margin_status text not null default 'pending', inventory_status text not null default 'review', risk text not null default 'review',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;

drop policy if exists "products_select_authenticated" on public.products;
create policy "products_select_authenticated" on public.products for select to authenticated using (true);
drop policy if exists "products_insert_authenticated" on public.products;
create policy "products_insert_authenticated" on public.products for insert to authenticated with check (owner_id = auth.uid() and tenant_id = auth.uid());
drop policy if exists "products_update_owner_or_admin" on public.products;
create policy "products_update_owner_or_admin" on public.products for update to authenticated using (owner_id = auth.uid() or public.is_admin()) with check (owner_id = auth.uid() or public.is_admin());
drop policy if exists "products_delete_admin_only" on public.products;
create policy "products_delete_admin_only" on public.products for delete to authenticated using (public.is_admin());

create index if not exists products_tenant_id_idx on public.products (tenant_id);
create index if not exists products_created_at_idx on public.products (created_at desc);
create index if not exists products_risk_idx on public.products (risk);

create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null default auth.uid(),
  owner_id uuid not null default auth.uid(),
  name text not null, offer_type text not null, margin text, refund_risk text not null default 'review', audience_fit text, status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.offers enable row level security;

drop policy if exists "offers_select_authenticated" on public.offers;
create policy "offers_select_authenticated" on public.offers for select to authenticated using (true);
drop policy if exists "offers_insert_authenticated" on public.offers;
create policy "offers_insert_authenticated" on public.offers for insert to authenticated with check (owner_id = auth.uid() and tenant_id = auth.uid());
drop policy if exists "offers_update_owner_or_admin" on public.offers;
create policy "offers_update_owner_or_admin" on public.offers for update to authenticated using (owner_id = auth.uid() or public.is_admin()) with check (owner_id = auth.uid() or public.is_admin());
drop policy if exists "offers_delete_admin_only" on public.offers;
create policy "offers_delete_admin_only" on public.offers for delete to authenticated using (public.is_admin());

create index if not exists offers_tenant_id_idx on public.offers (tenant_id);
create index if not exists offers_created_at_idx on public.offers (created_at desc);
create index if not exists offers_status_idx on public.offers (status);
create index if not exists offers_refund_risk_idx on public.offers (refund_risk);

create table if not exists public.creatives (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null default auth.uid(),
  owner_id uuid not null default auth.uid(),
  asset_name text not null, platform text not null, stage text not null default 'draft', approval_state text not null default 'draft' check (approval_state in ('draft','approved','deployed')), risk text not null default 'medium',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.creatives enable row level security;

drop policy if exists "creatives_select_authenticated" on public.creatives;
create policy "creatives_select_authenticated" on public.creatives for select to authenticated using (true);
drop policy if exists "creatives_insert_authenticated" on public.creatives;
create policy "creatives_insert_authenticated" on public.creatives for insert to authenticated with check (owner_id = auth.uid() and tenant_id = auth.uid());
drop policy if exists "creatives_update_owner_or_admin" on public.creatives;
create policy "creatives_update_owner_or_admin" on public.creatives for update to authenticated using (owner_id = auth.uid() or public.is_admin()) with check (owner_id = auth.uid() or public.is_admin());
drop policy if exists "creatives_delete_admin_only" on public.creatives;
create policy "creatives_delete_admin_only" on public.creatives for delete to authenticated using (public.is_admin());

create index if not exists creatives_tenant_id_idx on public.creatives (tenant_id);
create index if not exists creatives_created_at_idx on public.creatives (created_at desc);
create index if not exists creatives_approval_state_idx on public.creatives (approval_state);
create index if not exists creatives_risk_idx on public.creatives (risk);

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null default auth.uid(),
  owner_id uuid not null default auth.uid(),
  name text not null, platform text not null, audience text, offer text, budget numeric(12,2) not null default 0, status text not null default 'draft', approval_state text not null default 'required', readiness_score integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.campaigns enable row level security;

drop policy if exists "campaigns_select_authenticated" on public.campaigns;
create policy "campaigns_select_authenticated" on public.campaigns for select to authenticated using (true);
drop policy if exists "campaigns_insert_authenticated" on public.campaigns;
create policy "campaigns_insert_authenticated" on public.campaigns for insert to authenticated with check (owner_id = auth.uid() and tenant_id = auth.uid());
drop policy if exists "campaigns_update_owner_or_admin" on public.campaigns;
create policy "campaigns_update_owner_or_admin" on public.campaigns for update to authenticated using (owner_id = auth.uid() or public.is_admin()) with check (owner_id = auth.uid() or public.is_admin());
drop policy if exists "campaigns_delete_admin_only" on public.campaigns;
create policy "campaigns_delete_admin_only" on public.campaigns for delete to authenticated using (public.is_admin());

create index if not exists campaigns_tenant_id_idx on public.campaigns (tenant_id);
create index if not exists campaigns_created_at_idx on public.campaigns (created_at desc);
create index if not exists campaigns_status_idx on public.campaigns (status);
create index if not exists campaigns_approval_state_idx on public.campaigns (approval_state);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null default auth.uid(),
  owner_id uuid not null default auth.uid(),
  event_type text not null, source text not null, quality text not null default 'needs_review', profile_key text, occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.events enable row level security;

drop policy if exists "events_select_authenticated" on public.events;
create policy "events_select_authenticated" on public.events for select to authenticated using (true);
drop policy if exists "events_insert_authenticated" on public.events;
create policy "events_insert_authenticated" on public.events for insert to authenticated with check (owner_id = auth.uid() and tenant_id = auth.uid());
drop policy if exists "events_update_owner_or_admin" on public.events;
create policy "events_update_owner_or_admin" on public.events for update to authenticated using (owner_id = auth.uid() or public.is_admin()) with check (owner_id = auth.uid() or public.is_admin());
drop policy if exists "events_delete_admin_only" on public.events;
create policy "events_delete_admin_only" on public.events for delete to authenticated using (public.is_admin());

create index if not exists events_tenant_id_idx on public.events (tenant_id);
create index if not exists events_created_at_idx on public.events (created_at desc);
create index if not exists events_event_type_idx on public.events (event_type);
create index if not exists events_quality_idx on public.events (quality);

create table if not exists public.analytics_views (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null default auth.uid(),
  owner_id uuid not null default auth.uid(),
  metric_name text not null, metric_value text not null, period text not null, status text not null default 'review',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.analytics_views enable row level security;

drop policy if exists "analytics_views_select_authenticated" on public.analytics_views;
create policy "analytics_views_select_authenticated" on public.analytics_views for select to authenticated using (true);
drop policy if exists "analytics_views_insert_authenticated" on public.analytics_views;
create policy "analytics_views_insert_authenticated" on public.analytics_views for insert to authenticated with check (owner_id = auth.uid() and tenant_id = auth.uid());
drop policy if exists "analytics_views_update_owner_or_admin" on public.analytics_views;
create policy "analytics_views_update_owner_or_admin" on public.analytics_views for update to authenticated using (owner_id = auth.uid() or public.is_admin()) with check (owner_id = auth.uid() or public.is_admin());
drop policy if exists "analytics_views_delete_admin_only" on public.analytics_views;
create policy "analytics_views_delete_admin_only" on public.analytics_views for delete to authenticated using (public.is_admin());

create index if not exists analytics_views_tenant_id_idx on public.analytics_views (tenant_id);
create index if not exists analytics_views_created_at_idx on public.analytics_views (created_at desc);
create index if not exists analytics_views_status_idx on public.analytics_views (status);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null default auth.uid(),
  owner_id uuid not null default auth.uid(),
  action text not null, entity_type text not null, entity_id text, actor_id uuid default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.audit_logs enable row level security;

drop policy if exists "audit_logs_select_authenticated" on public.audit_logs;
create policy "audit_logs_select_authenticated" on public.audit_logs for select to authenticated using (true);
drop policy if exists "audit_logs_insert_authenticated" on public.audit_logs;
create policy "audit_logs_insert_authenticated" on public.audit_logs for insert to authenticated with check (owner_id = auth.uid() and tenant_id = auth.uid());
drop policy if exists "audit_logs_update_owner_or_admin" on public.audit_logs;
create policy "audit_logs_update_owner_or_admin" on public.audit_logs for update to authenticated using (owner_id = auth.uid() or public.is_admin()) with check (owner_id = auth.uid() or public.is_admin());
drop policy if exists "audit_logs_delete_admin_only" on public.audit_logs;
create policy "audit_logs_delete_admin_only" on public.audit_logs for delete to authenticated using (public.is_admin());

create index if not exists audit_logs_tenant_id_idx on public.audit_logs (tenant_id);
create index if not exists audit_logs_created_at_idx on public.audit_logs (created_at desc);

create table if not exists public.ai_recommendations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null default auth.uid(),
  owner_id uuid not null default auth.uid(),
  recommendation text not null, expected_impact text, reason text not null, risk text not null default 'medium', confidence text, approval_state text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.ai_recommendations enable row level security;

drop policy if exists "ai_recommendations_select_authenticated" on public.ai_recommendations;
create policy "ai_recommendations_select_authenticated" on public.ai_recommendations for select to authenticated using (true);
drop policy if exists "ai_recommendations_insert_authenticated" on public.ai_recommendations;
create policy "ai_recommendations_insert_authenticated" on public.ai_recommendations for insert to authenticated with check (owner_id = auth.uid() and tenant_id = auth.uid());
drop policy if exists "ai_recommendations_update_owner_or_admin" on public.ai_recommendations;
create policy "ai_recommendations_update_owner_or_admin" on public.ai_recommendations for update to authenticated using (owner_id = auth.uid() or public.is_admin()) with check (owner_id = auth.uid() or public.is_admin());
drop policy if exists "ai_recommendations_delete_admin_only" on public.ai_recommendations;
create policy "ai_recommendations_delete_admin_only" on public.ai_recommendations for delete to authenticated using (public.is_admin());

create index if not exists ai_recommendations_tenant_id_idx on public.ai_recommendations (tenant_id);
create index if not exists ai_recommendations_created_at_idx on public.ai_recommendations (created_at desc);
create index if not exists ai_recommendations_approval_state_idx on public.ai_recommendations (approval_state);
create index if not exists ai_recommendations_risk_idx on public.ai_recommendations (risk);

create table if not exists public.marketplaces (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null default auth.uid(),
  owner_id uuid not null default auth.uid(),
  channel text not null, listing_status text not null default 'review', order_status text, inventory_status text, profit_status text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.marketplaces enable row level security;

drop policy if exists "marketplaces_select_authenticated" on public.marketplaces;
create policy "marketplaces_select_authenticated" on public.marketplaces for select to authenticated using (true);
drop policy if exists "marketplaces_insert_authenticated" on public.marketplaces;
create policy "marketplaces_insert_authenticated" on public.marketplaces for insert to authenticated with check (owner_id = auth.uid() and tenant_id = auth.uid());
drop policy if exists "marketplaces_update_owner_or_admin" on public.marketplaces;
create policy "marketplaces_update_owner_or_admin" on public.marketplaces for update to authenticated using (owner_id = auth.uid() or public.is_admin()) with check (owner_id = auth.uid() or public.is_admin());
drop policy if exists "marketplaces_delete_admin_only" on public.marketplaces;
create policy "marketplaces_delete_admin_only" on public.marketplaces for delete to authenticated using (public.is_admin());

create index if not exists marketplaces_tenant_id_idx on public.marketplaces (tenant_id);
create index if not exists marketplaces_created_at_idx on public.marketplaces (created_at desc);
create index if not exists marketplaces_listing_status_idx on public.marketplaces (listing_status);

create table if not exists public.workspace_settings (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null default auth.uid(),
  owner_id uuid not null default auth.uid(),
  setting_key text not null, setting_value text not null, category text not null, status text not null default 'review',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.workspace_settings enable row level security;

drop policy if exists "workspace_settings_select_authenticated" on public.workspace_settings;
create policy "workspace_settings_select_authenticated" on public.workspace_settings for select to authenticated using (true);
drop policy if exists "workspace_settings_insert_authenticated" on public.workspace_settings;
create policy "workspace_settings_insert_authenticated" on public.workspace_settings for insert to authenticated with check (owner_id = auth.uid() and tenant_id = auth.uid());
drop policy if exists "workspace_settings_update_owner_or_admin" on public.workspace_settings;
create policy "workspace_settings_update_owner_or_admin" on public.workspace_settings for update to authenticated using (owner_id = auth.uid() or public.is_admin()) with check (owner_id = auth.uid() or public.is_admin());
drop policy if exists "workspace_settings_delete_admin_only" on public.workspace_settings;
create policy "workspace_settings_delete_admin_only" on public.workspace_settings for delete to authenticated using (public.is_admin());

create index if not exists workspace_settings_tenant_id_idx on public.workspace_settings (tenant_id);
create index if not exists workspace_settings_created_at_idx on public.workspace_settings (created_at desc);
create index if not exists workspace_settings_status_idx on public.workspace_settings (status);

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;

drop trigger if exists workspace_settings_touch_updated_at on public.workspace_settings;
create trigger workspace_settings_touch_updated_at before update on public.workspace_settings for each row execute function public.touch_updated_at();
drop trigger if exists data_sources_touch_updated_at on public.data_sources;
create trigger data_sources_touch_updated_at before update on public.data_sources for each row execute function public.touch_updated_at();
drop trigger if exists import_jobs_touch_updated_at on public.import_jobs;
create trigger import_jobs_touch_updated_at before update on public.import_jobs for each row execute function public.touch_updated_at();
drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at before update on public.profiles for each row execute function public.touch_updated_at();
drop trigger if exists consent_rules_touch_updated_at on public.consent_rules;
create trigger consent_rules_touch_updated_at before update on public.consent_rules for each row execute function public.touch_updated_at();
drop trigger if exists audiences_touch_updated_at on public.audiences;
create trigger audiences_touch_updated_at before update on public.audiences for each row execute function public.touch_updated_at();
drop trigger if exists destinations_touch_updated_at on public.destinations;
create trigger destinations_touch_updated_at before update on public.destinations for each row execute function public.touch_updated_at();
drop trigger if exists products_touch_updated_at on public.products;
create trigger products_touch_updated_at before update on public.products for each row execute function public.touch_updated_at();
drop trigger if exists offers_touch_updated_at on public.offers;
create trigger offers_touch_updated_at before update on public.offers for each row execute function public.touch_updated_at();
drop trigger if exists creatives_touch_updated_at on public.creatives;
create trigger creatives_touch_updated_at before update on public.creatives for each row execute function public.touch_updated_at();
drop trigger if exists campaigns_touch_updated_at on public.campaigns;
create trigger campaigns_touch_updated_at before update on public.campaigns for each row execute function public.touch_updated_at();
drop trigger if exists events_touch_updated_at on public.events;
create trigger events_touch_updated_at before update on public.events for each row execute function public.touch_updated_at();
drop trigger if exists analytics_views_touch_updated_at on public.analytics_views;
create trigger analytics_views_touch_updated_at before update on public.analytics_views for each row execute function public.touch_updated_at();
drop trigger if exists audit_logs_touch_updated_at on public.audit_logs;
create trigger audit_logs_touch_updated_at before update on public.audit_logs for each row execute function public.touch_updated_at();
drop trigger if exists ai_recommendations_touch_updated_at on public.ai_recommendations;
create trigger ai_recommendations_touch_updated_at before update on public.ai_recommendations for each row execute function public.touch_updated_at();
drop trigger if exists marketplaces_touch_updated_at on public.marketplaces;
create trigger marketplaces_touch_updated_at before update on public.marketplaces for each row execute function public.touch_updated_at();

create or replace function public.dashboard_kpis() returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'active_campaigns', (select count(*) from public.campaigns where status in ('ready','active','approved')),
    'conversion_events', (select count(*) from public.events where event_type in ('Purchase','Lead','InitiateCheckout')),
    'audience_size', coalesce((select sum(eligible_count) from public.audiences), 0),
    'suppression_count', (select count(*) from public.consent_rules where status in ('suppressed','revoked','active')),
    'queued_imports', (select count(*) from public.import_jobs where status in ('draft','mapping_required','needs_review','processing'))
  );
$$;

