# Aifluence – LLM Readiness API

## ✅ Features:
- `/api/audit` → POST any URL
- Returns LLM readability audit using GPT-4
- Includes schema flag, clarity score, and improvement suggestions
- Built for GPT Action + browser UI integration

## 🔧 Deploy Steps

1. Add `OPENAI_API_KEY` to Vercel
2. Visit `/api/audit`
3. POST: `{ "url": "https://example.com" }`

## 🌐 GPT Setup
Connect `/public/openapi.yaml` to your GPT under “Actions” → “API schema URL”

Deploy URL becomes:
`https://yourproject.vercel.app/api/audit`