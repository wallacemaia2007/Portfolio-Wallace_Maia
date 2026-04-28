// api/index.js — Vercel Serverless Function
// Wraps the Express + JSON Server app so Vercel can call it

const path = require("path");
const fs = require("fs");

// ── carrega as dependências ──────────────────────────────────────────────────
const jsonServer = require("json-server");
const rateLimit = require("express-rate-limit");

// Caminho do bd.json  →  na raiz do projeto (fora de /api)
const DB_PATH = path.join(__dirname, "..", "server", "bd.json");

const server = jsonServer.create();
const router = jsonServer.router(DB_PATH);

// Rewrite: /experiences* → /experience*
const rewriter = jsonServer.rewriter({
  "/experiences*": "/experience$1",
});

// Trust proxy (Vercel roda atrás de reverse proxy)
server.set("trust proxy", 1);

// ── CORS ─────────────────────────────────────────────────────────────────────
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

server.use(jsonServer.bodyParser);

// ── helpers ──────────────────────────────────────────────────────────────────
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

  if (!apiKey || !from)
    throw new Error("RESEND_API_KEY/RESEND_FROM não configurados.");

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

// ── rotas customizadas do "about" ─────────────────────────────────────────────
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

// ── rate limit para /api/contact ─────────────────────────────────────────────
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

// ── POST /api/contact ─────────────────────────────────────────────────────────
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

    // salvar no bd.json (em memória no Vercel — sem persistência entre requests)
    const contacts = router.db.get("contacts");
    if (!contacts.value()) router.db.set("contacts", []).write();
    router.db.get("contacts").push(contactRecord).write();

    const mailTo = process.env.MAIL_TO;
    if (!mailTo) throw new Error("MAIL_TO não configurado.");

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

// ── upload mock ───────────────────────────────────────────────────────────────
server.post("/api/upload-file/single", (_req, res) => {
  return res.status(201).jsonp({
    url: "https://via.placeholder.com/1200x800.png?text=upload-mock",
  });
});

// ── rotas automáticas do bd.json ─────────────────────────────────────────────
server.use("/api", rewriter, router);

// ── exporta para o Vercel (serverless handler) ────────────────────────────────
module.exports = server;
