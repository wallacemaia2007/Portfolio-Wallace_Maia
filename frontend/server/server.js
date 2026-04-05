// server/server.js
require("dotenv").config();

const path = require("path");
const jsonServer = require("json-server");
const rateLimit = require("express-rate-limit");

// Caminho do bd.json relativo a este arquivo (server/)
const DB_PATH = path.join(__dirname, "bd.json");

const server = jsonServer.create();
const router = jsonServer.router(DB_PATH);

const rewriter = jsonServer.rewriter({
  "/experiences*": "/experience$1",
});

// Railway roda atrás de proxy reverso — necessário para rate-limit ler IP corretamente
server.set("trust proxy", 1);

// ====================
// CORS
// ====================
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// ====================
// MIDDLEWARES
// ====================
server.use(jsonServer.bodyParser);

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

async function sendEmailViaResend({ to, replyTo, subject, text }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !from) {
    throw new Error("RESEND_API_KEY/RESEND_FROM nao configurados.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject, text }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    const error = new Error(
      `Resend API error (${response.status}): ${errorBody}`,
    );
    error.code = "RESEND_API_ERROR";
    error.command = "HTTP";
    throw error;
  }
}

// ====================
// ROTAS CUSTOMIZADAS (GET) — leem sub-chaves do about no bd.json
// ====================
server.get("/api/education", (_req, res) => {
  const list = router.db.get("about.educationList").value() || [];
  res.jsonp(list);
});

server.get("/api/journey", (_req, res) => {
  const list = router.db.get("about.journeyItems").value() || [];
  res.jsonp(list);
});

server.get("/api/values", (_req, res) => {
  const list = router.db.get("about.values").value() || [];
  res.jsonp(list);
});

server.get("/api/hobbies", (_req, res) => {
  const list = router.db.get("about.hobbies").value() || [];
  res.jsonp(list);
});

// ====================
// RATE LIMIT (ANTI-SPAM)
// ====================
server.use(
  "/api/contact",
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: "Muitas tentativas. Tente novamente mais tarde.",
    },
  }),
);

// ====================
// POST /api/contact
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
      return res
        .status(400)
        .jsonp({
          success: false,
          message: "Campos obrigatórios: name, email e message.",
        });
    }

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

    // Salvar no bd.json (só persiste enquanto o container estiver rodando)
    const contacts = router.db.get("contacts");
    if (!contacts.value()) router.db.set("contacts", []).write();
    router.db.get("contacts").push(contactRecord).write();

    // Enviar email
    const mailTo = process.env.MAIL_TO;
    if (!mailTo) throw new Error("MAIL_TO nao configurado.");

    const formattedDate = new Date(contactRecord.createdAt).toLocaleString(
      "pt-BR",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      },
    );

    await sendEmailViaResend({
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

    return res.status(201).jsonp({
      success: true,
      message: "Mensagem enviada com sucesso!",
      data: { id: contactRecord.id, createdAt: contactRecord.createdAt },
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
  return res
    .status(201)
    .jsonp({
      url: "https://via.placeholder.com/1200x800.png?text=upload-mock",
    });
});

// ====================
// JSON SERVER — rotas automáticas do bd.json
// ====================
server.use("/api", rewriter, router);

// ====================
// ANGULAR — arquivos estáticos do build
// ====================
const express = require("express");
const distPath = path.join(__dirname, "../dist/pielak-web/browser");
server.use(express.static(distPath));

// Fallback SPA (HashLocation)
server.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ====================
// START
// ====================
const port = Number(process.env.PORT || 3000);
server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`API: http://localhost:${port}/api`);
  console.log(`Frontend: http://localhost:${port}`);
});
