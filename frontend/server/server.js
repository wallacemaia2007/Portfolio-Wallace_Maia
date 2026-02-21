// server/server.js
require("dotenv").config();

const path = require("path");
const jsonServer = require("json-server");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

const server = jsonServer.create();
const router = jsonServer.router("server/bd.json");

const rewriter = jsonServer.rewriter({
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
server.use(jsonServer.bodyParser);

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
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;
  const host = process.env.MAIL_HOST || "smtp.gmail.com";
  const port = Number(process.env.MAIL_PORT || 587);
  const secure = process.env.MAIL_SECURE === "true" || port === 465;

  if (!user || !pass) {
    throw new Error("MAIL_USER/MAIL_PASS nao configurados.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: Number(process.env.MAIL_CONNECTION_TIMEOUT || 15000),
    greetingTimeout: Number(process.env.MAIL_GREETING_TIMEOUT || 15000),
    socketTimeout: Number(process.env.MAIL_SOCKET_TIMEOUT || 30000),
    dnsTimeout: Number(process.env.MAIL_DNS_TIMEOUT || 10000),
    tls: {
      minVersion: "TLSv1.2",
    },
  });
}

// ====================
// ROTAS CUSTOMIZADAS (GET)
// ====================
server.get("/api/education", (_req, res) => {
  const education = router.db.get("about.educationList").value() || [];
  res.jsonp(education);
});

server.get("/api/journey", (_req, res) => {
  const journeyItems = router.db.get("about.journeyItems").value() || [];
  res.jsonp(journeyItems);
});

server.get("/api/values", (_req, res) => {
  const values = router.db.get("about.values").value() || [];
  res.jsonp(values);
});

server.get("/api/hobbies", (_req, res) => {
  const hobbies = router.db.get("about.hobbies").value() || [];
  res.jsonp(hobbies);
});

// ====================
// RATE LIMIT (ANTI-SPAM)
// ====================
server.use(
  "/api/contact",
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
server.post("/api/contact", async (req, res) => {
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

    const contacts = router.db.get("contacts");
    if (!contacts.value()) router.db.set("contacts", []).write();

    router.db.get("contacts").push(contactRecord).write();

    // 2) ENVIAR EMAIL
    const mailTo = process.env.MAIL_TO || process.env.MAIL_USER;
    const mailFrom = process.env.MAIL_FROM || process.env.MAIL_USER;
    const mailFromName = process.env.MAIL_FROM_NAME || "Portfolio";

    const transporter = createTransporter();
    await transporter.verify();
    const createdAtDate = new Date(contactRecord.createdAt);
    const formattedDate = createdAtDate.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    await transporter.sendMail({
      from: `"${mailFromName}" <${mailFrom}>`,
      to: mailTo,
      replyTo: email,
      subject: `[Portfolio] ${subject}`, 
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
    const code = err?.code || "UNKNOWN";
    const command = err?.command || "UNKNOWN";
    const response = err?.response || err?.message || "Sem detalhes";
    console.error(`Erro /contact [${code}] [${command}]:`, response);
    return res.status(500).jsonp({
      success: false,
      message: "Sua mensagem foi recebida, mas houve erro ao enviar o email.",
      errorCode: code,
      errorCommand: command,
    });
  }
});

// ====================
// UPLOAD MOCK
// ====================
server.post("/api/upload-file/single", (_req, res) => {
  return res.status(201).jsonp({
    url: "https://via.placeholder.com/1200x800.png?text=upload-mock",
  });
});

// ====================
// ROTAS JSON SERVER (API)
// ====================
server.use("/api", rewriter, router);

// ====================
// SERVIR ANGULAR (PRODUÇÃO)
// ====================
const distPath = path.join(__dirname, "../dist/pielak-web/browser");
const express = require("express");

server.use(express.static(distPath));

// Fallback para SPA com HashLocation
server.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ====================
// START
// ====================
const port = Number(process.env.PORT || 3000);
server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`API disponível em http://localhost:${port}/api`);
  console.log(`Frontend disponível em http://localhost:${port}`);
});


