# Kakodacury - Sistema Completo de Imobiliária

Sistema completo de gestão imobiliária com dashboard administrativo, rastreamento de leads e integração com WhatsApp.

## 🚀 Funcionalidades

### 📊 Dashboard Administrativo
- **Gestão de Imóveis**: CRUD completo com importação/exportação Excel
- **Banco de Conteúdo**: Gerenciamento de banners do carrossel
- **Rastreamento de Leads**: Sistema de pixel com captura de IP, geolocalização e dispositivo
- **Filtros Avançados**: Por origem, data e status
- **Upload de Imagens**: Direto na dashboard
- **Gerenciamento de Destaques**: Toggle switch para destacar imóveis

### 🌐 Páginas Públicas
- **Homepage**: Carrossel de banners, busca de imóveis, seções informativas
- **Imóveis**: Listagem completa com filtros
- **Indicação**: Programa "Indique e Ganhe"
- **Contato**: Formulário com integração WhatsApp
- **Sobre**: Informações da empresa

### 🔧 Integrações
- WhatsApp em todos os formulários
- Botão flutuante do WhatsApp (oculto em páginas admin)
- Sistema de rastreamento de conversões

## 💻 Tecnologias

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Routing**: React Router DOM v6
- **State Management**: Context API
- **Data Persistence**: localStorage
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Excel**: XLSX

## 🛠️ Instalação e Desenvolvimento

### Pré-requisitos
- Node.js 18+ e npm

### Passos

```sh
# 1. Clone o repositório
git clone https://github.com/karlosedu4rdo/kakodacury-rebuild-premium.git

# 2. Navegue até o diretório
cd kakodacury-rebuild-premium

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:8080`

## 📦 Build para Produção

```sh
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`

## 🚀 Deploy na Vercel

### Opção 1: Via GitHub (Recomendado)

1. Faça push do código para o GitHub
2. Acesse [Vercel](https://vercel.com)
3. Clique em "New Project"
4. Importe o repositório do GitHub
5. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Clique em "Deploy"

### Opção 2: Via CLI da Vercel

```sh
# Instale a CLI da Vercel
npm i -g vercel

# Execute o deploy
vercel
```

### Deploy com um clique:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/karlosedu4rdo/kakodacury-rebuild-premium)

## ⚙️ Configuração para Deploy

O arquivo `vercel.json` já está configurado para garantir que todas as rotas do React Router funcionem corretamente:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 🎨 Tema e Cores

- **Cor Primária**: `#1328c6` (Azul Kakodacury)
- **Design System**: Totalmente customizado em `src/index.css`

## 📱 Responsividade

Totalmente responsivo e otimizado para:
- Desktop
- Tablet
- Mobile

## 🔐 Acesso Admin

- **URL**: `/admin`
- **Senha padrão**: `admin123`

## 📄 Estrutura do Projeto

```
kakodacury-rebuild-premium/
├── public/
│   ├── favicon.svg          # Favicon personalizado
│   └── robots.txt
├── src/
│   ├── components/          # Componentes React
│   │   ├── ui/             # Componentes Shadcn/UI
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── WhatsAppButton.tsx
│   │   └── ...
│   ├── contexts/           # Context API
│   │   ├── PropertiesContext.tsx
│   │   ├── BannersContext.tsx
│   │   └── LeadsContext.tsx
│   ├── pages/              # Páginas da aplicação
│   │   ├── Index.tsx
│   │   ├── Imoveis.tsx
│   │   ├── Dashboard.tsx
│   │   └── ...
│   ├── lib/                # Utilidades
│   │   ├── mockData.ts
│   │   └── utils.ts
│   ├── App.tsx
│   └── main.tsx
├── vercel.json             # Configuração Vercel
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

## 🤝 Contribuindo

Este é um projeto privado. Para contribuições, entre em contato com o proprietário.

## 📞 Contato

- **WhatsApp**: (11) 92177-3843
- **Email**: contato@kakodacury.com.br

## 📝 Licença

Todos os direitos reservados © 2025 Kakodacury Corretor de Imóveis
