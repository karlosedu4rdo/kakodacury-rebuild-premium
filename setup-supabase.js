import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
const supabaseUrl = 'https://yybzxeyglqjlqxmwgowx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5Ynp4ZXlnbHFqbHF4bXdnb3d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MzAwNzAsImV4cCI6MjA3NjEwNjA3MH0.tfLi24Ovcfs7MzlS4dxStC015H7PZTgdzddOlHFUeV4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTableAndPolicies() {
  try {
    console.log('🔧 Criando tabela properties...');
    
    // Primeiro, vamos tentar inserir dados para ver se a tabela já existe
    const { data: existingData, error: selectError } = await supabase
      .from('properties')
      .select('*')
      .limit(1);

    if (selectError && selectError.code === 'PGRST116') {
      console.log('📋 Tabela properties não existe. Execute o SQL no dashboard do Supabase:');
      console.log('');
      console.log('1. Acesse: https://supabase.com/dashboard');
      console.log('2. Vá para SQL Editor');
      console.log('3. Execute o seguinte SQL:');
      console.log('');
      console.log('-- Criar a tabela properties');
      console.log('CREATE TABLE properties (');
      console.log('  id TEXT PRIMARY KEY,');
      console.log('  name TEXT NOT NULL,');
      console.log('  location TEXT NOT NULL,');
      console.log('  region TEXT NOT NULL,');
      console.log('  price TEXT NOT NULL,');
      console.log('  area TEXT NOT NULL,');
      console.log('  bedrooms INTEGER NOT NULL,');
      console.log('  bathrooms INTEGER NOT NULL,');
      console.log('  image TEXT NOT NULL,');
      console.log('  status TEXT NOT NULL CHECK (status IN (\'launch\', \'ready\', \'construction\')),');
      console.log('  featured BOOLEAN DEFAULT FALSE,');
      console.log('  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),');
      console.log('  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
      console.log(');');
      console.log('');
      console.log('-- Habilitar Row Level Security (RLS)');
      console.log('ALTER TABLE properties ENABLE ROW LEVEL SECURITY;');
      console.log('');
      console.log('-- Políticas para acesso público');
      console.log('CREATE POLICY "Allow public read access" ON properties FOR SELECT USING (true);');
      console.log('CREATE POLICY "Allow public insert" ON properties FOR INSERT WITH CHECK (true);');
      console.log('CREATE POLICY "Allow public update" ON properties FOR UPDATE USING (true);');
      console.log('CREATE POLICY "Allow public delete" ON properties FOR DELETE USING (true);');
      console.log('');
      return;
    }

    if (selectError) {
      console.error('❌ Erro ao verificar tabela:', selectError);
      return;
    }

    console.log('✅ Tabela properties já existe!');
    console.log('📊 Dados encontrados:', existingData.length, 'propriedades');

    // Se a tabela existe mas está vazia, inserir dados de teste
    if (existingData.length === 0) {
      console.log('📝 Inserindo dados de teste...');
      
      const testData = [
        {
          id: '1',
          name: 'Vila Itaquera',
          location: 'Itaquera',
          region: 'Leste',
          price: 'R$ 249.900',
          area: '56m² a 62m²',
          bedrooms: 2,
          bathrooms: 1,
          image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
          status: 'construction',
          featured: false
        },
        {
          id: '2',
          name: 'Vila Ré',
          location: 'Vila Ré',
          region: 'Leste',
          price: 'R$ 285.000',
          area: '58m² a 66m²',
          bedrooms: 2,
          bathrooms: 1,
          image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop',
          status: 'ready',
          featured: true
        }
      ];

      const { data: insertData, error: insertError } = await supabase
        .from('properties')
        .insert(testData);

      if (insertError) {
        console.error('❌ Erro ao inserir dados:', insertError);
      } else {
        console.log('✅ Dados de teste inseridos com sucesso!');
      }
    }

    console.log('🎉 Configuração concluída!');

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

createTableAndPolicies();
