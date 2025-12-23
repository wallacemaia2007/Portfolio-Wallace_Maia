// server/server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("server/bd.json");

// ====================
// CORS TOTAL
// ====================
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ====================
// MIDDLEWARES
// ====================
server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);

// ====================
// LOG
// ====================
server.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// ====================
// ROTAS CUSTOMIZADAS
// (VOCÊ SÓ ADICIONA AQUI)
// ====================

// ====================
// ROTAS PADRÃO
// ====================
server.use(router);

// ====================
// START
// ====================
server.listen(3000, () => {
  console.log("🚀 JSON Server rodando em http://localhost:3000");
});
