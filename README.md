# AI Cloud Cost Whisperer

A full-stack web app that pulls AWS billing data, visualises cost breakdowns,
and uses GPT-4o to explain cost spikes in plain English.

**Live app:** https://ai-cost-whisperer-frontend.onrender.com

## Tech Stack
- Backend: Node.js + Express
- Frontend: React + Recharts
- AI: OpenAI GPT-4o
- Database: MongoDB
- Infrastructure: Docker, GitHub Actions

## Getting Started

### Backend
```bash
cd backend
npm install
cp .env.example .env   # fill in your secrets
npm run dev
```
