const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = 'https://yybzxeyglqjlqxmwgowx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5Ynp4ZXlnbHFqbHF4bXdnb3d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MzAwNzAsImV4cCI6MjA3NjEwNjA3MH0.tfLi24Ovcfs7MzlS4dxStC015H7PZTgdzddOlHFUeV4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    console.log('🔧 Configurando banco de dados...');
    
    // SQL para criar a tabela properties
    const createTableSQL = `
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
    `;

    // Executar SQL usando RPC (Remote Procedure Call)
    const { data, error } = await supabase.rpc('exec_sql', { sql: createTableSQL });
    
    if (error) {
      console.error('❌ Erro ao criar tabela:', error);
      return;
    }

    console.log('✅ Tabela properties criada com sucesso!');

    // Habilitar RLS
    const enableRLSSQL = `ALTER TABLE properties ENABLE ROW LEVEL SECURITY;`;
    await supabase.rpc('exec_sql', { sql: enableRLSSQL });
    console.log('✅ RLS habilitado!');

    // Criar políticas
    const policies = [
      `CREATE POLICY IF NOT EXISTS "Allow public read access" ON properties FOR SELECT USING (true);`,
      `CREATE POLICY IF NOT EXISTS "Allow public insert" ON properties FOR INSERT WITH CHECK (true);`,
      `CREATE POLICY IF NOT EXISTS "Allow public update" ON properties FOR UPDATE USING (true);`,
      `CREATE POLICY IF NOT EXISTS "Allow public delete" ON properties FOR DELETE USING (true);`
    ];

    for (const policy of policies) {
      await supabase.rpc('exec_sql', { sql: policy });
    }
    console.log('✅ Políticas criadas!');

    // Inserir dados iniciais
    const initialData = [
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
      .insert(initialData);

    if (insertError) {
      console.log('ℹ️ Dados iniciais já existem ou erro ao inserir:', insertError.message);
    } else {
      console.log('✅ Dados iniciais inseridos!');
    }

    console.log('🎉 Configuração do banco de dados concluída!');

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

setupDatabase();
