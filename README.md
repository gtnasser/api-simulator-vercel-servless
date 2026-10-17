# api-simulator-vercel-servless

API simulador hosted on Vercel using Servless

---

O objetivo deste projeto é criar uma API simulada no Vercel usando Serverless Functions, em js, evitando o uso de Node.js.
Essa "API" simula disponibilizar endpoints que recebam requisições HTTP e retornem informações como método, headers e payload.

```code
my-api-simulada/
 ├── api/
 │    └── simulador.js
 ├── index.html
 └── vercel.json (opcional)
```

## simulador.js

Esta rotina retorna um JSON contendo:
- métodos http
- headers
- payload
- query params

A rotina trata CORS para permitir a execução local da página index.html direto no navegador.

## Deploy

- Logue com sua conta no [Vercel](https://vercel.com).
- Abra o painel de projetos.
- Clique em `Add New` > `Project`
- Conecte o seu [GitHub](https://github.com), e em `Import Git Repository`, selecione o repositório que você criou.
- Não é necessário alterar nenhum configuração, clique em `Deploy`
- Abra no seu navegador a url do projeto, ex: https://nome-do-seu-projeto.vercel.app/api/simulador


