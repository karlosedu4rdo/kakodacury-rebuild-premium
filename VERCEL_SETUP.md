# Configuração das Variáveis de Ambiente na Vercel

## 📋 **Passos para Configurar na Vercel:**

1. **Acesse o Dashboard da Vercel**: https://vercel.com/dashboard
2. **Selecione seu projeto**: kakodacury-rebuild-premium
3. **Vá para Settings** → **Environment Variables**
4. **Adicione as seguintes variáveis**:

### 🔑 **Variáveis Obrigatórias:**

```
VITE_SUPABASE_URL = https://yybzxeyglqjlqxmwgowx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5Ynp4ZXlnbHFqbHF4bXdnb3d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MzAwNzAsImV4cCI6MjA3NjEwNjA3MH0.tfLi24Ovcfs7MzlS4dxStC015H7PZTgdzddOlHFUeV4
```

### 🔧 **Configurações Importantes:**

- **Environment**: Selecione "Production", "Preview" e "Development"
- **Apply to**: All environments
- **Save** as configurações

### 🚀 **Após Configurar:**

1. **Faça um novo deploy** na Vercel
2. **Teste a persistência** adicionando/editando imóveis
3. **Recarregue a página** - os dados devem persistir

## ✅ **Verificação:**

- ✅ Credenciais do Supabase configuradas
- ✅ Tabela properties criada no Supabase
- ✅ Políticas RLS configuradas
- ✅ Aplicação funcionando localmente
- ⏳ Variáveis de ambiente na Vercel (próximo passo)
- ⏳ Deploy e teste final
