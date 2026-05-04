# AI Cloud Cost Whisperer

> Understand your AWS bill in plain English — powered by AI

A full-stack web app that pulls live AWS billing data, visualises cost breakdowns with interactive charts, and uses Groq Llama 3.3 to explain cost spikes and suggest fixes — all in plain English.

**[Live App](https://ai-cost-whisperer-frontend.onrender.com)** · **[Backend API](https://ai-cost-whisperer-backend.onrender.com/health)**

---

## What it does

- Fetches real AWS cost data using the **Cost Explorer API**
- Displays an interactive **cost breakdown dashboard** with charts
- Uses **AI (Groq Llama 3.3)** to explain spikes and recommend optimisations
- Saves historical cost snapshots to **MongoDB** automatically every day
- Fully containerised with **Docker** and auto-deployed via **CI/CD**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js 20 + Express |
| Frontend | React + Recharts |
| AI | Groq Llama 3.3 (via Groq API) |
| Database | MongoDB Atlas + Mongoose |
| Containerisation | Docker + Docker Compose |
| CI/CD | GitHub Actions |
| Deployment | Render (Docker image) |
| Cloud data | AWS Cost Explorer API |

---

## Project Structure

```
ai-cost-whisperer/
├── backend/
│   ├── routes/          # /api/costs and /api/insights
│   ├── services/        # AWS and AI integrations
│   ├── models/          # MongoDB schemas
│   ├── middleware/      # Error handler
│   └── server.js        # Entry point
├── frontend/
│   └── src/
│       ├── components/  # CostChart, InsightCard, ServiceTable
│       ├── pages/       # Dashboard
│       └── services/    # Axios API calls
├── .github/workflows/   # CI/CD pipeline
└── docker-compose.yml   # Local orchestration
```

---

## Getting Started Locally

### Prerequisites
- Node.js 20+
- Docker + Docker Compose
- AWS account with Cost Explorer enabled
- Groq API key (free at console.groq.com)
- MongoDB Atlas connection string

### Run with Docker Compose

```bash
git clone https://github.com/pravijain789/ai-cost-whisperer.git
cd ai-cost-whisperer
cp backend/.env.example backend/.env
# Fill in your secrets in backend/.env
docker compose up --build
```

Frontend: http://localhost:3000  
Backend: http://localhost:5000

### Run without Docker

```bash
# Backend
cd backend
npm install
cp .env.example .env   # fill in your secrets
npm run dev

# Frontend (in a new terminal)
cd frontend
npm install
npm start
```

---

## Environment Variables

Create `backend/.env` using `backend/.env.example` as a template:

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=ap-south-1
GROQ_API_KEY=
MONGODB_URI=
PORT=5000
```

---

## CI/CD Pipeline

Every `git push` to `main` triggers:

1. **Test** — runs Jest tests against a real MongoDB instance
2. **Build & Push** — builds Docker images and pushes to Docker Hub
3. **Deploy** — triggers Render to pull the new images and restart

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Server health check |
| GET | `/api/costs` | AWS cost breakdown by service |
| GET | `/api/insights` | AI-generated cost explanation |
