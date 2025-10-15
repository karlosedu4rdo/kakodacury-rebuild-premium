# Configuração do Supabase para Persistência de Dados

## Problema Resolvido
O sistema anterior usava apenas `localStorage` para persistir dados, o que causava problemas na Vercel porque:
- Cada usuário tinha seus próprios dados locais
- Não havia sincronização entre usuários
- Dados eram perdidos ao limpar o cache do navegador

## Solução Implementada
Implementei uma solução híbrida usando **Supabase** como banco de dados principal com fallback para `localStorage`:

### 1. Instalação do Supabase
```bash
npm install @supabase/supabase-js
```

### 2. Configuração das Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto com:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Configuração do Banco de Dados no Supabase

#### Criar a tabela `properties`:
```sql
CREATE TABLE properties (
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
CREATE POLICY "Allow public read access" ON properties
  FOR SELECT USING (true);

-- Política para permitir inserção pública
CREATE POLICY "Allow public insert" ON properties
  FOR INSERT WITH CHECK (true);

-- Política para permitir atualização pública
CREATE POLICY "Allow public update" ON properties
  FOR UPDATE USING (true);

-- Política para permitir exclusão pública
CREATE POLICY "Allow public delete" ON properties
  FOR DELETE USING (true);
```

### 4. Migração dos Dados Existentes
Para migrar os dados existentes do `mockData.ts` para o Supabase, você pode:

1. Executar o SQL acima no Supabase
2. Usar a interface do Supabase para inserir os dados manualmente
3. Ou criar um script de migração

### 5. Configuração na Vercel
1. Acesse o dashboard da Vercel
2. Vá para Settings > Environment Variables
3. Adicione as variáveis:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Faça um novo deploy

## Funcionalidades Implementadas

### PropertyService
- ✅ Buscar todas as propriedades
- ✅ Adicionar nova propriedade
- ✅ Atualizar propriedade existente
- ✅ Deletar propriedade
- ✅ Deletar todas as propriedades
- ✅ Fallback automático para localStorage

### PropertiesContext Atualizado
- ✅ Carregamento assíncrono dos dados
- ✅ Estado de loading
- ✅ Operações assíncronas com tratamento de erro
- ✅ Fallback para localStorage em caso de erro

## Vantagens da Solução

1. **Persistência Real**: Dados são salvos no banco de dados Supabase
2. **Sincronização**: Mudanças são refletidas para todos os usuários
3. **Confiabilidade**: Fallback para localStorage em caso de problemas
4. **Escalabilidade**: Supabase pode lidar com grandes volumes de dados
5. **Gratuito**: Supabase oferece plano gratuito generoso
6. **Fácil Configuração**: Integração simples com Vercel

## Como Testar

1. Configure o Supabase conforme as instruções acima
2. Faça deploy na Vercel
3. Adicione/edite/delete propriedades
4. Recarregue a página - os dados devem persistir
5. Teste em diferentes navegadores/dispositivos

## Próximos Passos (Opcionais)

1. **Autenticação**: Implementar login para administradores
2. **Validação**: Adicionar validação de dados no backend
3. **Backup**: Configurar backup automático
4. **Analytics**: Adicionar métricas de uso
5. **Cache**: Implementar cache inteligente
