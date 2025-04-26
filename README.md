# CodeLeap Network

![CodeLeap Network](public/codeleap.png)

Uma rede social simples e interativa para compartilhar ideias e pensamentos com a comunidade.

## 🚀 Demo

Acesse a versão online: [CodeLeap Network](https://codeleap-network-xi.vercel.app/)

## ✨ Funcionalidades Implementadas

### Requisitos Principais

- ✅ Interface de usuário fiel ao design proposto
- ✅ Login com nome de usuário
- ✅ Criação, edição e exclusão de posts
- ✅ Listagem de posts com informações de autor e data
- ✅ Filtragem de posts por autor
- ✅ Proteção de rotas (acesso restrito apenas para usuários logados)
- ✅ Consistência visual e usabilidade aprimorada

### Recursos Bônus

- ✅ Animações e transições suaves (Framer Motion)
- ✅ Efeitos visuais de recompensa (confetti/emoji para criar/deletar posts)
- ✅ Interface responsiva para diversos dispositivos
- ✅ Solução de login/logout com localStorage
- ✅ Filtragem de posts por autor e por posts do usuário
- ✅ Animações de carregamento
- ✅ Feedback visual durante operações
- ✅ Tratamento de erros

## 🛠️ Tecnologias Utilizadas

- **React** - Biblioteca para construção de interfaces
- **TypeScript** - Linguagem tipada para desenvolvimento mais seguro
- **Vite** - Bundler e servidor de desenvolvimento
- **Tailwind CSS** - Framework CSS para estilos
- **Framer Motion** - Biblioteca para animações
- **React Rewards** - Animações de recompensa
- **Axios** - Cliente HTTP para requisições à API
- **React Router DOM** - Navegação e roteamento
- **Lucide React** - Ícones

## 📋 Pré-requisitos

- Node.js (versão 18.x ou superior)
- npm ou yarn

## 🔧 Instalação e Execução Local

1. Clone o repositório

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

4. Acesse o projeto no navegador:

```
http://localhost:5173
```

## 📦 Build para Produção

Para gerar uma build de produção:

```bash
npm run build
# ou
yarn build
```

Os arquivos de build serão gerados na pasta `dist`.

## 🧪 Estrutura do Projeto

```
codeleap-network/
├── public/               # Arquivos públicos
├── src/                  # Código fonte
│   ├── assets/           # Imagens e arquivos estáticos
│   ├── components/       # Componentes React
│   │   ├── auth/         # Componentes de autenticação
│   │   ├── common/       # Componentes compartilhados (Button, Input, etc.)
│   │   └── posts/        # Componentes relacionados a posts
│   ├── hooks/            # Custom hooks
│   ├── pages/            # Páginas da aplicação
│   │   ├── app/          # Páginas principais
│   │   └── auth/         # Páginas de autenticação
│   ├── services/         # Serviços e API
│   ├── styles/           # Estilos globais
│   ├── types/            # Definições de tipos TypeScript
│   ├── utils/            # Utilitários
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Ponto de entrada da aplicação
│   └── routes.tsx        # Configuração de rotas
├── index.html            # HTML principal
└── package.json          # Dependências e scripts
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
