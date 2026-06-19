# Mosquito na Mira

> **Aplicativo mobile para mapeamento e combate aos focos de Dengue, Zika e Chikungunya na cidade de Palhoça - SC.**

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Ionic](https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## Sobre o Projeto
O **Mosquito na Mira** é uma solução tecnológica desenvolvida para auxiliar a população e os órgãos de saúde pública no combate ao mosquito *Aedes aegypti*. Através do celular, qualquer cidadão pode denunciar focos de água parada, acompanhar o status da sua denúncia e acessar informações vitais sobre as unidades de saúde da região.

---

## Funcionalidades Principais
* **Denúncia de Focos:** Formulário interativo com captura de foto nativa e geolocalização (GPS) automática do usuário.
* **Mapa Interativo:** Visualização de mapas de calor e áreas de abrangência de focos de risco usando a API do Google Maps.
* **Postos de Saúde:** Listagem das Unidades Básicas de Saúde (UBS) com atalhos diretos para traçar rotas no GPS do celular ou realizar chamadas telefônicas.
* **Dashboard de Dados:** Estatísticas e filtros sobre os casos confirmados na região.
* **Consulta de Protocolo:** Acompanhamento em tempo real do status da denúncia através do número de protocolo.

---

## Tecnologias Utilizadas
O projeto foi construído utilizando as abordagens mais modernas de desenvolvimento front-end híbrido:
* **Framework Web:** Angular (Padrão Standalone Components)
* **Framework Mobile:** Ionic Framework
* **Integração Nativa:** Capacitor (`@capacitor/camera`, `@capacitor/geolocation`)
* **Mapas:** `@angular/google-maps`

---

## Como Executar o Projeto Localmente

### Pré-requisitos
* [Node.js](https://nodejs.org/) (Versão 18 ou superior)
* [Ionic CLI](https://ionicframework.com/docs/cli) instalado globalmente (`npm install -g @ionic/cli`)

### Passos para Instalação

1. Clone este repositório:
   ```bash
   git clone [https://github.com/SEU_USUARIO/mosquito-na-mira.git](https://github.com/SEU_USUARIO/mosquito-na-mira.git)

2. Entre na pasta do projeto:
   ```bash
   cd mosquito-na-mira

3. Instale as depedências:
   ```bash
   npm install
   npm install @capacitor/camera @capacitor/geolocation
   npm install @angular/google-maps@20
   npm install -D @types/google.maps

4. Sync final:
    ```bash
    ionic build
    npx cap sync

5. Inicie o projeto
   ```base
   ionic serve
