# Maya + GenZ AI foundation

This branch adds the first server-side foundation without changing the existing public website.

## Included

- `/api/health`: reports whether server-side services are configured. It never returns secret values.
- `/api/chat`: a private, approval-first Maya chat endpoint.
- `.env.example`: names of the server environment variables required later.

## Required Vercel environment variables

Set these in **Vercel → Project → Settings → Environment Variables**. Do not put them in frontend code or commit real values.

- `MAYA_ACCESS_TOKEN`: a long, random private access token.
- `AI_API_KEY`: API key from the chosen AI provider.
- `AI_MODEL`: model identifier supported by that provider.
- `AI_BASE_URL`: provider API base URL. Defaults to OpenAI's API base URL.
- `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`: reserved for the database stage. Keep the service-role key server-only.

## Private chat request

Send a POST request to `/api/chat` with:

- Header: `Authorization: Bearer <MAYA_ACCESS_TOKEN>`
- Header: `Content-Type: application/json`
- JSON body: `{ "message": "..." }`

The endpoint is intentionally not connected to the public website yet. The private dashboard, user authentication, secure token handling, database schema and customer-facing GenZ AI will be added in later stages.

## Safety boundaries

Maya can draft and recommend actions. This foundation does not send emails or WhatsApp messages, contact leads, make bookings, issue invoices, sign contracts, spend money or modify production systems. Those workflows require authenticated user identity, explicit approval controls and appropriate integrations before they can be enabled.

## Next development stages

1. Add private sign-in and a Maya dashboard.
2. Store conversations and business records in Supabase.
3. Build the separate customer-facing GenZ AI website assistant.
4. Add lead capture, approvals, messaging and business workflows.
5. Add audit logs, rate limiting and deployment checks before production use.
