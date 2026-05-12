import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { chatWithCompanyContext, ingestCompanyContext } from './rag.js';

dotenv.config({ override: true });

const app = express();
const port = Number(process.env.PORT ?? 3000);
const clientOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173';

app.use(cors({ origin: clientOrigin }));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    service: 'rag-chatbot-api',
    status: 'ok',
    health: '/api/health',
  });
});

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'rag-chatbot-api',
    message: 'Express backend is ready for the LangChain RAG pipeline.',
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/ingest', async (_req, res) => {
  try {
    const result = await ingestCompanyContext();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to ingest context.',
    });
  }
});

app.post('/api/chat', async (req, res) => {
  const question = req.body?.question;

  if (typeof question !== 'string' || question.trim().length === 0) {
    res.status(400).json({
      status: 'error',
      message: 'Request body must include a non-empty question string.',
    });
    return;
  }

  try {
    const result = await chatWithCompanyContext(question.trim());
    res.json(result);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to run RAG chat.',
    });
  }
});

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
