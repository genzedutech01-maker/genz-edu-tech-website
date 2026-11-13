declare const process: { env: Record<string, string | undefined> };

type RequestLike = { method?: string };
type ResponseLike = {
  status(code: number): ResponseLike;
  json(data: unknown): void;
  setHeader(name: string, value: string): void;
};

export default function handler(req: RequestLike, res: ResponseLike) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  return res.status(200).json({
    status: "ok",
    service: "GenZ Edu Tech AI foundation",
    configuration: {
      mayaAccessConfigured: Boolean(process.env.MAYA_ACCESS_TOKEN),
      aiProviderConfigured: Boolean(process.env.AI_API_KEY && process.env.AI_MODEL),
      databaseConfigured: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
    },
  });
}
