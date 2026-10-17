export default function handler(req, res) {
  // Configura CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // ou restrinja para seu domínio
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Trata requisições OPTIONS (preflight)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Captura dados
  const metodo = req.method;
  const headers = req.headers;
  const queryParams = req.query;
  let payload = null;

  try {
    payload = req.body ? req.body : null;
  } catch (e) {
    payload = { erro: "Não foi possível interpretar o payload." };
  }

  res.status(200).json({
    metodoRecebido: metodo,
    headersRecebidos: headers,
    queryParamsRecebidos: queryParams,
    payloadRecebido: payload,
    timestamp: new Date().toISOString()
  });
}
