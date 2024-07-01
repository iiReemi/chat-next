
# Aplicação de Chat com Next.js

Esta é uma aplicação de chat em tempo real construída com Next.js, NestJS, Firebase e Socket.io. A aplicação permite que os usuários conversem em tempo real com diversos recursos como armazenamento de mensagens, uploads de arquivos e notificações sonoras.

## Funcionalidades

- Mensagens em tempo real
- Upload de arquivos (áudio e imagens)
- Upload de imagens a partir da câmera ou do álbum
- Notificação sonora ao receber mensagens
- Indicação de quando o usuário está digitando ou gravando áudio
- Design responsivo

## Começando

### Pré-requisitos

Certifique-se de ter os seguintes itens instalados no seu sistema:

- Node.js (v12 ou posterior)
- npm ou yarn
- Conta no Firebase
- Servidor Socket.io

### Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/seuusuario/seu-repo.git
cd seu-repo
```

2. **Instale as dependências:**

```bash
npm install
# ou
yarn install
```

3. **Crie um arquivo `.env.local` no diretório raiz e adicione as seguintes variáveis de ambiente:**

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_chave_api_do_firebase
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_dominio_auth_do_firebase
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_id_do_projeto_firebase
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_bucket_de_storage_firebase
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_id_de_envio_de_mensagens_firebase
NEXT_PUBLIC_FIREBASE_APP_ID=sua_id_do_app_firebase
NEXT_PUBLIC_SOCKET_IO_URL=sua_url_do_servidor_socket_io
```

### Configuração do Firebase

1. Vá para o [Console do Firebase](https://console.firebase.google.com/).
2. Crie um novo projeto ou use um projeto existente.
3. Navegue até Configurações do Projeto e adicione um novo app web.
4. Copie a configuração do Firebase e cole os valores no arquivo `.env.local` conforme mostrado acima.

### Executando a Aplicação

1. **Desenvolvimento:**

```bash
npm run dev
# ou
yarn dev
```

2. **Produção:**

```bash
npm run build
npm run start
# ou
yarn build
yarn start
```

### Estrutura do Projeto

- \`components/\` - Componentes React usados na aplicação
- \`pages/\` - Páginas Next.js
- \`styles/\` - Estilos CSS
- \`utils/\` - Funções utilitárias
- \`public/\` - Recursos públicos

### Scripts

- \`dev\` - Executa a aplicação em modo de desenvolvimento
- \`build\` - Compila a aplicação para produção
- \`start\` - Inicia a aplicação em modo de produção
- \`lint\` - Executa o ESLint

### Contribuindo

1. Faça um fork do repositório.
2. Crie uma nova branch: \`git checkout -b minha-branch-de-recurso\`
3. Faça suas alterações e comite-as: \`git commit -m 'Adicionei um novo recurso'\`
4. Envie para a branch: \`git push origin minha-branch-de-recurso\`
5. Envie um pull request.
