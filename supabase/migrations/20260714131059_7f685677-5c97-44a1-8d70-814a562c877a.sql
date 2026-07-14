
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  tag TEXT,
  description TEXT NOT NULL DEFAULT '',
  price NUMERIC(10,2) NOT NULL,
  old_price NUMERIC(10,2),
  installments TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL,
  gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
  colors JSONB NOT NULL DEFAULT '[]'::jsonb,
  storage_options JSONB NOT NULL DEFAULT '[]'::jsonb,
  rating NUMERIC(2,1) NOT NULL DEFAULT 5.0,
  stock INTEGER NOT NULL DEFAULT 10,
  featured BOOLEAN NOT NULL DEFAULT false,
  specs JSONB NOT NULL DEFAULT '{}'::jsonb,
  highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read products"
ON public.products FOR SELECT
USING (true);

CREATE INDEX products_category_idx ON public.products(category);
CREATE INDEX products_featured_idx ON public.products(featured);
