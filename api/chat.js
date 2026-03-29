import { createChatReply } from "../server/chat-core.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  try {
    const groqApiKey = process.env.GROQ_API_KEY;

    if (!groqApiKey) {
      res
        .status(500)
        .json({ error: "Missing GROQ_API_KEY in Vercel environment variables." });
      return;
    }

    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : req.body || {};
    const message = String(body?.message || "").trim();
    const history = Array.isArray(body?.history) ? body.history : [];

    if (!message) {
      res.status(400).json({ error: "Message is required." });
      return;
    }

    const result = await createChatReply({
      message,
      history,
      groqApiKey,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unexpected server error.",
    });
  }
}
