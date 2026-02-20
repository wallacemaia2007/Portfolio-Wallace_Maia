// server/server.js
require("dotenv").config();

const jsonServer = require("json-server");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

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
// HELPERS
// ====================
function sanitize(str) {
  if (typeof str !== "string") return str;
  return str
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/[<>]/g, "");
}

function createTransporter() {
  const service = process.env.MAIL_SERVICE || "gmail";
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;

  if (!user || !pass) {
    throw new Error("MAIL_USER/MAIL_PASS não configurados no .env");
  }

  return nodemailer.createTransport({
    service,
    auth: { user, pass },
  });
}

// ====================
// ROTAS CUSTOMIZADAS (GET)
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

// ====================
// RATE LIMIT (ANTI-SPAM)
// ====================
server.use(
  "/contact",
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 min
    max: 5, // 5 envios por IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: "Muitas tentativas. Tente novamente mais tarde.",
    },
  }),
);

// ====================
// POST /contact (SALVA + ENVIA EMAIL)
// ====================
server.post("/contact", async (req, res) => {
  try {
    const body = req.body || {};
    const name = sanitize(body.name);
    const email = (body.email || "").trim();
    const phone = body.phone ? sanitize(body.phone) : null;
    const subject = sanitize(body.subject || "Contato via portfolio");
    const message = sanitize(body.message);

    if (!name || !email || !message) {
      return res.status(400).jsonp({
        success: false,
        message: "Campos obrigatórios: name, email e message.",
      });
    }

    // 1) SALVAR NO JSON
    const contactRecord = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      subject,
      message,
      createdAt: new Date().toISOString(),
      status: "received",
    };

    // garante array contacts
    const contacts = router.db.get("contacts");
    if (!contacts.value()) router.db.set("contacts", []).write();

    router.db.get("contacts").push(contactRecord).write();

    // 2) ENVIAR EMAIL
    // Se você quiser que o site funcione mesmo sem .env, pode comentar este bloco
    // e deixar apenas salvar. Mas o ideal é enviar.
    const mailTo = process.env.MAIL_TO || process.env.MAIL_USER;

    const transporter = createTransporter();
    // Formata a data para dd/mm/yyyy HH:MM
    const createdAtDate = new Date(contactRecord.createdAt);
    const formattedDate = createdAtDate.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    await transporter.sendMail({
      from: `"Portfólio" <${process.env.MAIL_USER}>`,
      to: mailTo,
      replyTo: email,
      subject: `[Portfólio] ${subject}`,
      text:
      `Nome: ${name}\n` +
      `Email: ${email}\n` +
      `Telefone: ${phone || "-"}\n\n` +
      `${message}\n\n` +
      `ID: ${contactRecord.id}\n` +
      `Data: ${formattedDate}`,
    });

    // 3) RESPONDER
    return res.status(201).jsonp({
      success: true,
      message: "Mensagem enviada com sucesso!",
      data: {
        id: contactRecord.id,
        createdAt: contactRecord.createdAt,
      },
    });
  } catch (err) {
    console.error("Erro /contact:", err);
    return res.status(500).jsonp({
      success: false,
      message:
        "Sua mensagem foi recebida, mas ocorreu um erro ao enviar o email. Tente novamente mais tarde.",
    });
  }
});

// ====================
// UPLOAD MOCK
// ====================
server.post("/upload-file/single", (_req, res) => {
  return res.status(201).jsonp({
    url: "https://via.placeholder.com/1200x800.png?text=upload-mock",
  });
});

// ====================
// ROTAS PADRÃO
// ====================
server.use(router);

// ====================
// START
// ====================
const port = Number(process.env.PORT || 3000);
server.listen(port, () => {
  console.log(`JSON Server rodando em http://localhost:${port}`);
});
