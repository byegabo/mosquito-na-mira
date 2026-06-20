# Mosquito na Mira

> **Aplicativo full-stack para mapeamento e combate aos focos de Dengue, Zika e Chikungunya.**

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Ionic](https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

## Sobre o Projeto
O **Mosquito na Mira** é uma solução tecnológica em três camadas (Apresentação, Aplicação e Persistência) desenvolvida para auxiliar a população e os órgãos de saúde pública no combate ao mosquito *Aedes aegypti*. Através do celular, qualquer cidadão pode denunciar focos de água parada, realizar uma triagem virtual de sintomas via IA e acessar informações vitais sobre as unidades de saúde.

---

## Funcionalidades Principais
* **Denúncia de Focos (Geolocalizada):** Formulário interativo com captura de foto nativa e extração de coordenadas (GPS) automáticas do dispositivo.
* **Triagem Inteligente (Chatbot IA):** Assistente virtual integrado à IA Generativa para análise de sintomas e orientação do usuário, sem prescrição médica.
* **Postos de Saúde Dinâmicos:** Listagem ordenada alfabeticamente de UBS, UPAs e Hospitais cadastrados no banco de dados, com categorização visual, atalhos para traçar rotas e chamadas telefônicas nativas.
* **Dashboard Epidemiológico:** Painel inicial (Home) com mapa da cidade, barra de pesquisa e estatísticas de dados consumidas via API REST.
* **Suporte Integrado:** Seção de dúvidas frequentes (FAQ) com UI interativa (Accordion) e botões de Deep Linking para contato direto via WhatsApp e E-mail.

---

## Tecnologias Utilizadas
O projeto adota uma arquitetura limpa e moderna, separando as responsabilidades:

### Camada de Apresentação (Front-end Mobile)
* **Frameworks:** Ionic Framework & Angular (Standalone Components)
* **Linguagem & Estilo:** TypeScript, HTML5, SCSS (Suporte nativo a Dark/Light Mode)
* **Acesso a Hardware:** Capacitor (`@capacitor/camera`, `@capacitor/geolocation`)

### Camada de Aplicação (Back-end / API)
* **Framework:** NestJS (Node.js)
* **Inteligência Artificial:** SDK Google Generative AI (`@google/generative-ai`)
* **Arquitetura:** API RESTful modularizada (Controllers, Services)

### Camada de Persistência (Banco de Dados)
* **SGBD:** PostgreSQL
* **ORM:** Prisma ORM (Mapeamento declarativo e Tipagem Segura)

---

## Como Executar o Projeto Localmente

### Pré-requisitos Gerais
* [Node.js](https://nodejs.org/) (Versão 18 ou superior)
* [Ionic CLI](https://ionicframework.com/docs/cli) instalado globalmente (`npm install -g @ionic/cli`)
* [Nest CLI](https://docs.nestjs.com/cli/overview) instalado globalmente (`npm install -g @nestjs/cli`)
* Um banco de dados PostgreSQL rodando localmente ou em nuvem.

### Passo 1: Configuração do Back-end (API)

1. Entre na pasta do servidor e instale as dependências:
   ```bash
   cd mosquito-api
   npm install

2. Configure as variáveis de ambiente
* Crie um arquivo `.env` na raiz da pasta `mosquito-api`.
* Adicione a URL de conexão do seu banco de dados: `DATABASE_URL="postgresql://usuario:senha@localhost:5432/mosquitodb"`
* Adicione a chave da API do Google Gemini (se aplicável).

3. Sincronize o Prisma com o Banco de Dados
   ```bash
   npx prisma db push

4. (Opcional) Abra o Prisma Studio para popular o banco (ex: Cadastrar Postos de Saúde):
   ```bash
   npx prisma studio

5. Inicie o servidor:
   ```bash
   npm run start:dev

### Passo 2: Configuração do Front-end (Ionic/Angular)

1. Em um novo terminal, entre na pasta do aplicativo e instale as dependências:
    ```bash
    cd mosquito-na-mira
    npm install
    npm install @capacitor/camera @capacitor/geolocation

 2. Compile e sincronize com o Capacitor:
    ```bash
    ionic build
    npx cap sync

3. Inicie a aplicação no navegador (Modo de Desenvolvimento):
    ```bash
    ionic serve