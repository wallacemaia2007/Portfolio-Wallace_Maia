// server/server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("server/bd.json");

const rewriter = jsonServer.rewriter({
  "/api/*": "/$1",
  "/experiences*": "/experience$1",
});

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
server.use(rewriter);

// ====================
// LOG
// ====================
server.use((req, _res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// ====================
// ROTAS CUSTOMIZADAS
// ====================
server.get("/education", (_req, res) => {
  const education = router.db.get("about.educationList").value() || [];
  res.jsonp(education);
});

server.get("/journey", (_req, res) => {
  const journeyItems = router.db.get("about.journeyItems").value() || [];
  res.jsonp(journeyItems);
});

server.get("/values", (_req, res) => {
  const values = router.db.get("about.values").value() || [];
  res.jsonp(values);
});

server.get("/hobbies", (_req, res) => {
  const hobbies = router.db.get("about.hobbies").value() || [];
  res.jsonp(hobbies);
});

server.post("/contact", (req, res) => {
  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).jsonp({
      success: false,
      message: "Campos obrigatorios: name, email e message.",
    });
  }

  const contactRecord = {
    id: Date.now().toString(),
    name,
    email,
    phone: phone || null,
    subject: subject || "Contato via portfolio",
    message,
    createdAt: new Date().toISOString(),
    status: "received",
  };

  router.db.get("contacts").push(contactRecord).write();

  return res.status(201).jsonp({
    success: true,
    message: "Mensagem enviada com sucesso!",
    data: {
      id: contactRecord.id,
      createdAt: contactRecord.createdAt,
    },
  });
});

server.post("/upload-file/single", (_req, res) => {
  return res.status(201).jsonp({
    url: "https://via.placeholder.com/1200x800.png?text=upload-mock",
  });
});

// ====================
// ROTAS PADRAO
// ====================
server.use(router);

// ====================
// START
// ====================
server.listen(3000, () => {
  console.log("JSON Server rodando em http://localhost:3000");
});
