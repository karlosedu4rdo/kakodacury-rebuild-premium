-- Script SQL para configurar a tabela properties no Supabase
-- Execute este script no SQL Editor do Supabase Dashboard

-- Criar a tabela properties
CREATE TABLE IF NOT EXISTS properties (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  region TEXT NOT NULL,
  price TEXT NOT NULL,
  area TEXT NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  image TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('launch', 'ready', 'construction')),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública
CREATE POLICY IF NOT EXISTS "Allow public read access" ON properties
  FOR SELECT USING (true);

-- Política para permitir inserção pública
CREATE POLICY IF NOT EXISTS "Allow public insert" ON properties
  FOR INSERT WITH CHECK (true);

-- Política para permitir atualização pública
CREATE POLICY IF NOT EXISTS "Allow public update" ON properties
  FOR UPDATE USING (true);

-- Política para permitir exclusão pública
CREATE POLICY IF NOT EXISTS "Allow public delete" ON properties
  FOR DELETE USING (true);

-- Inserir dados iniciais (opcional)
INSERT INTO properties (id, name, location, region, price, area, bedrooms, bathrooms, image, status, featured) VALUES
('1', 'Vila Itaquera', 'Itaquera', 'Leste', 'R$ 249.900', '56m² a 62m²', 2, 1, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop', 'construction', false),
('2', 'Vila Ré', 'Vila Ré', 'Leste', 'R$ 285.000', '58m² a 66m²', 2, 1, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop', 'ready', true),
('3', 'Vila Sônia II', 'Vila Sônia', 'Oeste', 'R$ 220.000', '50m² a 60m²', 2, 1, 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop', 'construction', false),
('4', 'Sacomã II', 'Sacomã', 'Sul', 'R$ 275.000', '56m² a 65m²', 2, 1, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop', 'construction', false),
('5', 'Giovanni Gronchi', 'Morumbi', 'Sul', 'R$ 295.000', '60m² a 70m²', 2, 1, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop', 'ready', false),
('6', 'Estação Itaberaba', 'Itaberaba', 'Norte', 'R$ 235.000', '55m² a 63m²', 1, 1, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop', 'launch', false),
('7', 'Vila Clarice', 'Vila Clarice', 'Leste', 'R$ 250.000', '58m² a 64m²', 2, 1, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop', 'construction', false),
('8', 'Tucuruvi', 'Tucuruvi', 'Norte', 'R$ 320.000', '65m² a 75m²', 2, 1, 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop', 'construction', false),
('9', 'São Joaquim', 'Liberdade', 'Centro', 'R$ 180.000', '45m² a 55m²', 2, 1, 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&auto=format&fit=crop', 'construction', false),
('10', 'Vista Cupecê', 'Cupecê', 'Sul', 'R$ 265.000', '58m² a 68m²', 1, 1, 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&auto=format&fit=crop', 'launch', false),
('11', 'Viva Penha', 'Penha', 'Leste', 'R$ 240.000', '54m² a 62m²', 2, 1, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop', 'launch', false),
('12', 'Campo Limpo', 'Campo Limpo', 'Sul', 'R$ 230.000', '52m² a 60m²', 1, 1, 'https://images.unsplash.com/photo-1600607688960-e095ff8d9239?w=800&auto=format&fit=crop', 'construction', false)
ON CONFLICT (id) DO NOTHING;
