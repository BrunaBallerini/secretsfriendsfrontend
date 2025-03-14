# Amigo Secreto - Typescript - Frontend

Este projeto é uma aplicação web para sorteios entre amigos, utilizando Rails no backend e React no frontend.

## Tecnologias Utilizadas

- [Typescript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Docker](https://www.docker.com/)

## Instalação e Configuração

### Pré-requisitos
Antes de começar, você precisa ter instalado:
- [Docker](https://docs.docker.com/get-started/get-docker/)

### Como rodar o projeto?

1. Clone os repositórios do backend e do frontend :
   ```bash
   git clone git@github.com:MatheusCarvalho2/secretsfriend.git
   git clone git@github.com:MatheusCarvalho2/secretsfriendsfrontend.git
   ```

2. Faça o build utilizando o docker e suba a aplicação :
   **Precisa ser feito nos dois projetos separados**
   ```bash
   docker compose build
   docker compose up
   docker compose run frontend bash -> npm install [somente primeira vez]
   ```

3. Acesse no navegador:
   ```
   http://localhost:5173
   ```

## Funcionalidades

- Cadastro e login de usuários
- Sorteio de participantes
- Envio do sorteio por e-mail
