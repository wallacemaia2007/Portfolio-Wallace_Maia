const path = require("path");
const fs = require("fs");

const jsonServer = require("json-server");
const rateLimit = require("express-rate-limit");

const DB_PATH = path.join(__dirname, "bd.json");

const server = jsonServer.create();
const router = jsonServer.router(DB_PATH);

const rewriter = jsonServer.rewriter({
  "/experiences*": "/experience$1",
});

server.set("trust proxy", 1);

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

server.use(jsonServer.bodyParser);

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
    const error = new Error(`Resend API error (${response.status}): ${errorBody}`);
    error.code = "RESEND_API_ERROR";
    error.command = "HTTP";
    throw error;
  }
}

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

    const contacts = router.db.get("contacts");
    if (!contacts.value()) router.db.set("contacts", []).write();
    router.db.get("contacts").push(contactRecord).write();

    const mailTo = process.env.MAIL_TO;
    if (!mailTo) throw new Error("MAIL_TO não configurado.");

    const formattedDate = new Date(contactRecord.createdAt).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

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
    console.error(`Erro /contact [${code}] [${command}]:`, err?.message);
    return res.status(500).jsonp({
      success: false,
      message: "Sua mensagem foi recebida, mas houve erro ao enviar o email.",
      errorCode: code,
      errorCommand: command,
    });
  }
});

server.post("/api/upload-file/single", (_req, res) => {
  return res.status(201).jsonp({
    url: "https://via.placeholder.com/1200x800.png?text=upload-mock",
  });
});

// ── Analytics ─────────────────────────────────────────────────────────────────
const crypto = require("crypto");
const ANALYTICS_SALT = crypto.randomBytes(8).toString("hex");

function hashIp(ip) {
  return crypto.createHash("sha256").update(ip + ANALYTICS_SALT).digest("hex");
}

function getDeviceType(ua) {
  if (!ua) return "unknown";
  const l = ua.toLowerCase();
  if (/(tablet|ipad|playbook|sil)|(android(?!.*mobile))/i.test(l)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry/i.test(l)) return "mobile";
  return "desktop";
}

function getBrowser(ua) {
  if (!ua) return "unknown";
  const l = ua.toLowerCase();
  if (l.includes("edge") || l.includes("edg/")) return "Edge";
  if (l.includes("chrome")) return "Chrome";
  if (l.includes("safari") && !l.includes("chrome")) return "Safari";
  if (l.includes("firefox")) return "Firefox";
  if (l.includes("opera") || l.includes("opr/")) return "Opera";
  return "other";
}

function getOs(ua) {
  if (!ua) return "unknown";
  const l = ua.toLowerCase();
  if (l.includes("windows")) return "Windows";
  if (l.includes("mac")) return "macOS";
  if (l.includes("linux") && !l.includes("android")) return "Linux";
  if (l.includes("android")) return "Android";
  if (l.includes("iphone") || l.includes("ios")) return "iOS";
  return "other";
}

server.post("/api/analytics/visit", (req, res) => {
  try {
    const { sessionId: existingId, referrer, origin, country, language, pageEntered } = req.body;
    const ua = req.headers["user-agent"] || "";

    if (existingId) {
      const sessions = router.db.get("analytics_sessions").value() || [];
      const existing = sessions.find((s) => s.id === existingId && s.isActive);
      if (existing) {
        existing.lastActivity = new Date().toISOString();
        router.db.get("analytics_sessions").write();
        return res.json({ sessionId: existingId, existing: true });
      }
    }

    const session = {
      id: existingId || crypto.randomUUID(),
      ipHash: hashIp(req.ip || req.connection?.remoteAddress || "unknown"),
      userAgent: ua,
      referrer: referrer || "",
      origin: origin || "direct",
      deviceType: getDeviceType(ua),
      browser: getBrowser(ua),
      os: getOs(ua),
      country: country || null,
      language: language || null,
      pageEntered: pageEntered || "/",
      pageViewsCount: 0,
      eventsCount: 0,
      startedAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      isActive: true,
    };

    const sessions = router.db.get("analytics_sessions").value() || [];
    sessions.push(session);
    router.db.get("analytics_sessions").write();

    res.status(201).json({ sessionId: session.id, existing: false });
  } catch (err) {
    console.error("[Analytics Visit]", err);
    res.status(500).json({ error: "Failed to register visit" });
  }
});

server.post("/api/analytics/heartbeat", (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).json({ error: "sessionId required" });

    const sessions = router.db.get("analytics_sessions").value() || [];
    const session = sessions.find((s) => s.id === sessionId && s.isActive);
    if (session) {
      session.lastActivity = new Date().toISOString();
      router.db.get("analytics_sessions").write();
    }
    res.json({ ok: true });
  } catch (err) {
    console.error("[Analytics Heartbeat]", err);
    res.status(500).json({ error: "Heartbeat failed" });
  }
});

const DEBOUNCE = new Map();
setInterval(() => {
  const now = Date.now();
  for (const [k, t] of DEBOUNCE) if (now - t > 60000) DEBOUNCE.delete(k);
}, 60000);

server.post("/api/analytics/page-view", (req, res) => {
  try {
    const { sessionId, pagePath, pageTitle, timeSpentSeconds } = req.body;
    if (!sessionId || !pagePath) return res.status(400).json({ error: "sessionId and pagePath required" });

    const key = `${sessionId}:${pagePath}`;
    if (DEBOUNCE.has(key)) return res.json({ ok: true, debounced: true });
    DEBOUNCE.set(key, Date.now());

    const sessions = router.db.get("analytics_sessions").value() || [];
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      session.pageViewsCount = (session.pageViewsCount || 0) + 1;
      session.lastActivity = new Date().toISOString();
      router.db.get("analytics_sessions").write();
    }

    const views = router.db.get("analytics_page_views").value() || [];
    views.push({
      id: crypto.randomUUID(),
      sessionId,
      pagePath,
      pageTitle: pageTitle || "",
      timeSpentSeconds: timeSpentSeconds || 0,
      timestamp: new Date().toISOString(),
    });
    router.db.get("analytics_page_views").write();

    res.status(201).json({ ok: true, debounced: false });
  } catch (err) {
    console.error("[Analytics PageView]", err);
    res.status(500).json({ error: "Failed to register page view" });
  }
});

server.post("/api/analytics/event", (req, res) => {
  try {
    const { sessionId, eventName, category, label, value, pagePath, metadata } = req.body;
    if (!sessionId || !eventName) return res.status(400).json({ error: "sessionId and eventName required" });

    const sessions = router.db.get("analytics_sessions").value() || [];
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      session.eventsCount = (session.eventsCount || 0) + 1;
      session.lastActivity = new Date().toISOString();
      router.db.get("analytics_sessions").write();
    }

    const events = router.db.get("analytics_events").value() || [];
    events.push({
      id: crypto.randomUUID(),
      sessionId,
      eventName,
      category: category || null,
      label: label || null,
      value: value || null,
      pagePath: pagePath || null,
      metadata: metadata || null,
      timestamp: new Date().toISOString(),
    });
    router.db.get("analytics_events").write();

    res.status(201).json({ ok: true });
  } catch (err) {
    console.error("[Analytics Event]", err);
    res.status(500).json({ error: "Failed to register event" });
  }
});

server.post("/api/analytics/download", (req, res) => {
  try {
    const { sessionId, fileName, pagePath } = req.body;
    if (!sessionId || !fileName) return res.status(400).json({ error: "sessionId and fileName required" });

    const sessions = router.db.get("analytics_sessions").value() || [];
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      session.eventsCount = (session.eventsCount || 0) + 1;
      session.lastActivity = new Date().toISOString();
      router.db.get("analytics_sessions").write();
    }

    const downloads = router.db.get("analytics_downloads").value() || [];
    downloads.push({
      id: crypto.randomUUID(),
      sessionId,
      fileName,
      pagePath: pagePath || null,
      timestamp: new Date().toISOString(),
    });
    router.db.get("analytics_downloads").write();

    res.status(201).json({ ok: true });
  } catch (err) {
    console.error("[Analytics Download]", err);
    res.status(500).json({ error: "Failed to register download" });
  }
});

server.get("/api/analytics/stats/summary", (_req, res) => {
  try {
    const sessions = router.db.get("analytics_sessions").value() || [];
    const pageViews = router.db.get("analytics_page_views").value() || [];
    const downloads = router.db.get("analytics_downloads").value() || [];

    const uniqueIps = new Set(sessions.map((s) => s.ipHash));
    const countries = new Set(sessions.map((s) => s.country).filter(Boolean));

    const avgTime = pageViews.length > 0
      ? Math.round(pageViews.reduce((a, v) => a + (v.timeSpentSeconds || 0), 0) / pageViews.length)
      : 0;

    const projectViews = {};
    pageViews.forEach((v) => {
      if (v.pagePath.startsWith("/projects")) {
        projectViews[v.pagePath] = (projectViews[v.pagePath] || 0) + 1;
      }
    });

    let mostViewedProject = null;
    let mostViewedViews = 0;
    for (const [p, c] of Object.entries(projectViews)) {
      if (c > mostViewedViews) { mostViewedProject = p; mostViewedViews = c; }
    }

    const sourceCount = {};
    sessions.forEach((s) => {
      const o = s.origin || "direct";
      sourceCount[o] = (sourceCount[o] || 0) + 1;
    });
    const topSources = Object.entries(sourceCount)
      .map(([origin, total]) => ({ origin, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    res.json({
      totalVisits: pageViews.length,
      uniqueVisitors: uniqueIps.size,
      countriesReached: countries.size,
      totalDownloads: downloads.length,
      avgTimeOnSiteSeconds: avgTime,
      mostViewedProject,
      mostViewedProjectViews: mostViewedViews,
      topSources,
    });
  } catch (err) {
    console.error("[Analytics Summary]", err);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
});

server.get("/api/analytics/stats/live", (_req, res) => {
  try {
    const sessions = router.db.get("analytics_sessions").value() || [];
    const pageViews = router.db.get("analytics_page_views").value() || [];
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const today = new Date().toISOString().slice(0, 10);

    const onlineNow = sessions.filter((s) => s.isActive && s.lastActivity >= fiveMinAgo).length;
    const visitsToday = sessions.filter((s) => s.startedAt && s.startedAt.slice(0, 10) === today).length;

    const recentPages = pageViews.filter((v) => v.timestamp >= fiveMinAgo);
    const pageCount = {};
    recentPages.forEach((v) => {
      pageCount[v.pagePath] = (pageCount[v.pagePath] || 0) + 1;
    });
    const topPagesNow = Object.entries(pageCount)
      .map(([page_path, views]) => ({ page_path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    const countryCount = {};
    sessions.filter((s) => s.country).forEach((s) => {
      countryCount[s.country] = (countryCount[s.country] || 0) + 1;
    });
    const topCountries = Object.entries(countryCount)
      .map(([country, total]) => ({ country, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    res.json({ visitorsOnline: onlineNow, visitsToday, topPagesNow, topCountries });
  } catch (err) {
    console.error("[Analytics Live]", err);
    res.status(500).json({ error: "Failed to fetch live stats" });
  }
});

// ── Rotas automáticas do bd.json ──────────────────────────────────────────────
server.use("/api", rewriter, router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`[Mock Server] Running on http://localhost:${PORT}`);
  console.log(`[Mock Server] Analytics API at http://localhost:${PORT}/api/analytics`);
});
