import { createServer } from "node:http";
import path from "node:path";
import {
  createChatReply,
  getRootDir,
  loadLocalEnv,
} from "./chat-core.js";

const rootDir = getRootDir();
loadLocalEnv(path.join(rootDir, ".env.local"));

const port = Number(process.env.PORT || 3001);
const groqApiKey = process.env.GROQ_API_KEY;

createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/api/chat") {
    try {
      if (!groqApiKey) {
        sendJson(res, 500, {
          error: "Missing GROQ_API_KEY. Add it to .env.local before using chat.",
        });
        return;
      }

      const body = await readJsonBody(req);
      const message = String(body?.message || "").trim();
      const history = Array.isArray(body?.history) ? body.history : [];

      if (!message) {
        sendJson(res, 400, { error: "Message is required." });
        return;
      }

      const result = await createChatReply({
        message,
        history,
        groqApiKey,
      });

      sendJson(res, 200, result);
    } catch (error) {
      sendJson(res, 500, {
        error: error instanceof Error ? error.message : "Unexpected server error.",
      });
    }

    return;
  }

  sendJson(res, 404, { error: "Not found." });
}).listen(port, () => {
  console.log(`Groq chat server listening on http://localhost:${port}`);
});

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";

    req.on("data", (chunk) => {
      raw += chunk;
    });

    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });
}
