# LifeOS AI

ASK LifeOS — Human Intelligence & Care OS.

This repository contains the current LifeOS application source exported from the AppDeploy project. Core areas include Ask LifeOS, Life Goals/Day Mastery, Research, Library, Privacy, Settings, image generation, VEED video generation and Razorpay billing.

## Security

Never commit API keys. Configure provider secrets through the deployment environment:

- `OPENAI_API_KEY`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `FAL_KEY` for VEED/FAL video generation

The repository intentionally contains no secret values.

## Run

```bash
npm install
npm run dev
```

Production deployment should provide the required AppDeploy SDK environment and secrets.
