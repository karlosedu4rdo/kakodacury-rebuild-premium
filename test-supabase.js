import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
const supabaseUrl = 'https://yybzxeyglqjlqxmwgowx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5Ynp4ZXlnbHFqbHF4bXdnb3d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MzAwNzAsImV4cCI6MjA3NjEwNjA3MH0.tfLi24Ovcfs7MzlS4dxStC015H7PZTgdzddOlHFUeV4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('🔧 Testando conexão com Supabase...');
    
    // Testar conexão fazendo uma consulta simples
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .limit(1);

    if (error) {
      console.log('ℹ️ Tabela properties ainda não existe. Vamos criá-la...');
      console.log('📋 Execute o script SQL no dashboard do Supabase:');
      console.log('1. Acesse: https://supabase.com/dashboard');
      console.log('2. Vá para SQL Editor');
      console.log('3. Execute o conteúdo do arquivo supabase-setup.sql');
      return;
    }

    console.log('✅ Conexão com Supabase funcionando!');
    console.log('📊 Dados encontrados:', data.length, 'propriedades');

    // Inserir dados de teste se a tabela estiver vazia
    if (data.length === 0) {
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

  } catch (error) {
    console.error('❌ Erro ao testar conexão:', error);
  }
}

testConnection();
