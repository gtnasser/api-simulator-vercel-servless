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

## CORS

Para evitar o bloqueio feito pelo navegador quando executado localmente, adicionamos na função o tratamento das chamadas CORS:
- cabeçalhos `Access-Control-Allow-*`.
- método `OPTIONS`, que é a requisição “preflight” que o navegador faz antes de enviar o **POST/PUT**.

`simulador.api`
```js
  // Configura CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // ou restrinja para seu domínio
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Trata requisições OPTIONS (preflight)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
```

Se existirem várias funções, você pode centralizar as regras de CORS no Vercel adicionando o arquivo `vercel.json` na raiz do projeto. Assim não precisa repetir os cabeçalhos em cada função.
- Arquivo de configuração do Vercel.
- Aplica automaticamente os cabeçalhos de CORS para todas as rotas da API (/api/...).
- Permite chamadas de qualquer origem (*).
- Se quiser restringir, troque "*" por "http://localhost:5500" ou pelo domínio onde seu index.html ficará hospedado.

`vercel.json`
```code
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,POST,PUT,DELETE,OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "Content-Type" }
      ]
    }
  ]
}
```

## Deploy

- Logue com sua conta no [Vercel](https://vercel.com).
- Abra o painel de projetos.
- Clique em `Add New` > `Project`
- Conecte o seu [GitHub](https://github.com), e em `Import Git Repository`, selecione o repositório que você criou.
- Não é necessário alterar nenhum configuração, clique em `Deploy`
- Abra no seu navegador a url do projeto, ex: https://nome-do-seu-projeto.vercel.app/api/simulador


