declare const process: { env: Record<string, string | undefined> };

type RequestLike = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
};

type ResponseLike = {
  status(code: number): ResponseLike;
  json(data: unknown): void;
  setHeader(name: string, value: string): void;
};

const MAX_MESSAGE_LENGTH = 4000;

export default async function handler(req: RequestLike, res: ResponseLike) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const expectedToken = process.env.MAYA_ACCESS_TOKEN;
  const suppliedHeader = req.headers.authorization;
  const suppliedToken = Array.isArray(suppliedHeader)
    ? suppliedHeader[0]
    : suppliedHeader;

  if (!expectedToken || suppliedToken !== `Bearer ${expectedToken}`) {
    return res.status(401).json({ error: "Unauthorised" });
  }

  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL;
  const baseUrl = (process.env.AI_BASE_URL || "https://api.openai.com/v1")
    .replace(/\/$/, "");

  if (!apiKey || !model) {
    return res.status(503).json({
      error: "AI service is not configured. Add the required server environment variables.",
    });
  }

  const body = req.body as { message?: unknown } | undefined;
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({
      error: `Message must contain between 1 and ${MAX_MESSAGE_LENGTH} characters.`,
    });
  }

  try {
    const upstream = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content:
              "You are Maya, the private AI assistant for GenZ Edu Tech. Help with planning, drafting, research, coding guidance and business operations. You may prepare recommendations and drafts, but you must never claim to have sent messages, contacted people, booked appointments, issued invoices, signed agreements, spent money, changed production systems, or performed other external actions. Ask for explicit human approval before any sensitive or external action. Never request passwords, API keys, payment credentials or other secrets in chat. Be concise, practical and honest about limitations.",
          },
          { role: "user", content: message },
        ],
      }),
    });

    if (!upstream.ok) {
      return res.status(502).json({
        error: "The AI provider could not complete the request. Please try again.",
      });
    }

    const data = await upstream.json() as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(502).json({ error: "The AI provider returned an empty response." });
    }

    return res.status(200).json({ reply });
  } catch {
    return res.status(500).json({ error: "Maya is temporarily unavailable. Please try again." });
  }
}
