export default function handler(req, res) {
  // Captura método, headers e body
  const metodo = req.method;
  const headers = req.headers;
  let payload = null;

  try {
    payload = req.body ? req.body : null;
  } catch (e) {
    payload = { erro: "Não foi possível interpretar o payload." };
  }

  res.status(200).json({
    metodoRecebido: metodo,
    headersRecebidos: headers,
    payloadRecebido: payload,
    timestamp: new Date().toISOString()
  });
}
