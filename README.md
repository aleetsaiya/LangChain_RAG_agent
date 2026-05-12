# RAG Chatbot Demo

This project is a learning-focused full-stack RAG chatbot, it connects a React chat interface to a LangChain-powered backend, answers questions from company context, and visualizes chartable responses when relevant. 

The app is deployed on AWS EC2 with the frontend served by Nginx and the backend kept running with PM2.

[Live demo](http://3.27.117.32/)

Deployment note: this is a quick learning prototype, so the hosted demo uses an EC2 public IP over HTTP.

![Application preview](/public/preview.png)

## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS, Recharts
- Backend: Node.js, Express, LangChain, OpenAI, in-memory vector storage
- Cloud Infra: AWS EC2, Nginx, PM2

## RAG Pipeline

```text
Load data/company-context.md
 -> Split text into chunks
 -> Embed chunks with OpenAI embeddings
 -> Store vectors in MemoryVectorStore
 -> Retrieve relevant context for /api/chat
 -> Generate an answer with the OpenAI chat model
 -> Return answer, source snippets, and optional chart data
```

The frontend uses the returned `chartData` to render customer-safe metrics such as satisfaction trends and product interest mix.

## Local Setup

### Backend

```bash
cd api
npm install
cp .env.example .env
npm run build
npm run dev
```

Required backend environment variables:

```text
OPENAI_API_KEY=
OPENAI_CHAT_MODEL=gpt-5.4-mini
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
RAG_TOP_K=3
PORT=3000
```

### Frontend

```bash
cd web
npm install
npm run dev
```

The Vite dev server proxies `/api` requests to the local Express backend.
