# Secrets & Environment Variables

All secrets live in Vercel environment variables. Nothing is committed to source.
Local development uses `.env.local` (gitignored). See `.env.example` for the full list.

---

## DATABASE_URL

| Field        | Value                                                           |
| ------------ | --------------------------------------------------------------- |
| What         | Neon Postgres connection string with pooling                    |
| Issued from  | https://neon.tech → project dashboard → Connection Details      |
| Vercel envs  | Preview, Production                                             |
| Rotation     | Rotate in Neon dashboard; update Vercel immediately after       |

---

## ADMIN_TOKEN

| Field        | Value                                                           |
| ------------ | --------------------------------------------------------------- |
| What         | Bearer token protecting `/api/admin/*` and admin pages          |
| Issued from  | Generated locally — use `openssl rand -hex 32`                  |
| Vercel envs  | Preview, Production                                             |
| Rotation     | Replace value in Vercel; no downstream dependencies             |

---

## Stripe

### STRIPE_SECRET_KEY

| Field        | Value                                                                        |
| ------------ | ---------------------------------------------------------------------------- |
| What         | Server-side Stripe API key — used to create PaymentIntents, charge customers |
| Issued from  | https://dashboard.stripe.com/test/apikeys → "Secret key"                    |
| Vercel envs  | Preview (`sk_test_…`), Production (`sk_live_…`)                              |
| Rotation     | Roll in Stripe dashboard → Reveal → Roll; update Vercel immediately          |
| ⚠ Warning   | Never expose on the client. Server only.                                     |

### STRIPE_PUBLISHABLE_KEY

| Field        | Value                                                                        |
| ------------ | ---------------------------------------------------------------------------- |
| What         | Client-safe key for Stripe.js / Elements to tokenize card data               |
| Issued from  | https://dashboard.stripe.com/test/apikeys → "Publishable key"               |
| Vercel envs  | Preview (`pk_test_…`), Production (`pk_live_…`)                              |
| Rotation     | Rotate alongside `STRIPE_SECRET_KEY`                                         |
| Client       | Safe to expose — prefix with `NEXT_PUBLIC_` if you need it in browser code  |

### STRIPE_WEBHOOK_SECRET

| Field        | Value                                                                             |
| ------------ | --------------------------------------------------------------------------------- |
| What         | Signing secret to verify that webhook POSTs actually come from Stripe             |
| Issued from  | https://dashboard.stripe.com/test/webhooks → Add endpoint → reveal Signing secret |
| Vercel envs  | Preview (separate endpoint), Production (separate endpoint)                       |
| Rotation     | Roll in Stripe dashboard; update Vercel immediately                               |
| ⚠ Warning   | Each registered webhook endpoint has its own secret — don't mix them             |

---

## Click (Uzbekistan)

### CLICK_MERCHANT_ID

| Field        | Value                                                           |
| ------------ | --------------------------------------------------------------- |
| What         | Your numeric merchant identifier in Click's system              |
| Issued from  | https://merchant.click.uz → Integration → API settings          |
| Vercel envs  | Preview (sandbox), Production (live)                            |
| Rotation     | Contact Click merchant support to rotate                        |

### CLICK_SERVICE_ID

| Field        | Value                                                           |
| ------------ | --------------------------------------------------------------- |
| What         | Identifies which service/product within your merchant account   |
| Issued from  | https://merchant.click.uz → Integration → API settings          |
| Vercel envs  | Preview (sandbox), Production (live)                            |
| Rotation     | Contact Click merchant support to rotate                        |

### CLICK_SECRET_KEY

| Field        | Value                                                                 |
| ------------ | --------------------------------------------------------------------- |
| What         | HMAC signing key for verifying Click prepare/complete callback bodies |
| Issued from  | https://merchant.click.uz → Integration → API settings                |
| Vercel envs  | Preview (sandbox), Production (live)                                  |
| Rotation     | Contact Click merchant support to rotate                              |
| ⚠ Warning   | Never expose on the client. Server only.                              |

### CLICK_CALLBACK_PATH

| Field        | Value                                                           |
| ------------ | --------------------------------------------------------------- |
| What         | Path Click POSTs payment callbacks to (prepare + complete)      |
| Example      | `/api/payments/click/callback`                                  |
| Issued from  | You define this; register it in Click merchant cabinet          |
| Vercel envs  | Preview (must be publicly reachable; use ngrok in local dev), Production |

---

## Telegram

### TELEGRAM_BOT_TOKEN

| Field        | Value                                                                      |
| ------------ | -------------------------------------------------------------------------- |
| What         | HTTP API token for your Telegram bot                                       |
| Issued from  | Chat with @BotFather on Telegram → `/newbot` → copy the token             |
| Vercel envs  | Preview, Production (can share same bot or create separate bots)           |
| Rotation     | `/revoke` in @BotFather conversation; update Vercel immediately            |
| ⚠ Warning   | Anyone with this token can send messages as your bot. Server only.         |

### TELEGRAM_BOT_USERNAME

| Field        | Value                                                           |
| ------------ | --------------------------------------------------------------- |
| What         | Bot username without `@`, e.g. `ProInvoiceBot`                  |
| Issued from  | Set during @BotFather `/newbot` flow                            |
| Vercel envs  | Preview, Production                                             |
| Rotation     | N/A (username can be changed via @BotFather `/setusername`)     |

---

## Local Development Quick Start

```bash
cp .env.example .env.local
# Fill in DATABASE_URL from your Neon project
# Use Stripe test keys (sk_test_… / pk_test_…)
# Leave Click/Telegram blank until sandbox credentials arrive
```

### Test the charge endpoint locally

```bash
curl -X POST http://localhost:3000/api/test-charge \
  -H "Content-Type: application/json" \
  -H "x-dev-token: local-dev" \
  -d '{"amount": 5000, "currency": "usd"}'
# Returns: { "id": "pi_...", "clientSecret": "pi_..._secret_...", "amount": 5000, "currency": "usd" }
```

Requires `STRIPE_SECRET_KEY` to be set in `.env.local`. Use a `sk_test_…` key.
