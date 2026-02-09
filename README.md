# AlgoFlex-RAG

A full-stack RAG (Retrieval-Augmented Generation) application that enables users to upload documents, chat with AI, and retrieve contextual information using advanced vector search and LLM capabilities.

## 🚀 Features

- **Document Upload & Processing**: Upload PDF files for intelligent parsing and embedding generation
- **AI-Powered Chat**: Interact with an intelligent chatbot powered by OpenAI and LangChain
- **Vector Search**: Efficient semantic search using Qdrant vector database
- **User Authentication**: Secure authentication with Clerk
- **Background Processing**: Asynchronous file processing with BullMQ and Valkey (Redis)
- **Modern UI**: Responsive Next.js 16 frontend with Tailwind CSS
- **RESTful API**: Express.js backend with organized controllers and routes

## 📁 Project Structure

```
project/
├── my-app/              # Next.js Frontend Application
│   ├── app/             # Next.js App Router pages
│   │   ├── about/       # About page
│   │   ├── profile/     # User profile page
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Home page
│   ├── component/       # React components
│   │   ├── Chat.tsx
│   │   ├── FileUpload.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── LandingPage.tsx
│   └── public/          # Static assets
│
└── server/              # Express.js Backend Application
    ├── controllers/     # Request handlers
    │   ├── chat.controller.js
    │   ├── key.controller.js
    │   ├── upload.controller.js
    │   └── webhook.controller.js
    ├── routes/          # API routes
    ├── models/          # Database models
    ├── middleware/      # Custom middleware
    ├── workers/         # Background job workers
    ├── utils/           # Utility functions
    ├── db/              # Database configuration
    └── docker-compose.yml  # Container orchestration
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: Clerk
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5
- **Language**: JavaScript (ES Modules)
- **Authentication**: Clerk Express SDK
- **AI/ML**: 
  - LangChain (OpenAI, Community, Qdrant)
  - OpenAI API
  - PDF Processing (pdf-parse, pdfjs-dist)
- **Database**: MongoDB (Mongoose)
- **Vector Database**: Qdrant
- **Queue System**: BullMQ with Valkey (Redis)
- **Webhooks**: Svix
- **File Upload**: Multer

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Cache/Queue**: Valkey (Redis alternative)
- **Vector Store**: Qdrant

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker & Docker Compose
- MongoDB instance
- OpenAI API key
- Clerk account for authentication

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/minaamulhaq/AlgoFlex-Rag.git
cd project
```

### 2. Start Infrastructure Services

Start Qdrant (vector database) and Valkey (Redis) using Docker:

```bash
cd server
docker-compose up -d
```

This will start:
- Valkey (Redis) on `localhost:6379`
- Qdrant on `localhost:6333`

### 3. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file with the following variables:
# PORT=5000
# CLIENT_URL=http://localhost:3000
# MONGODB_URI=your_mongodb_connection_string
# OPENAI_API_KEY=your_openai_api_key
# CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
# CLERK_SECRET_KEY=your_clerk_secret_key
# QDRANT_URL=http://localhost:6333
# REDIS_URL=redis://localhost:6379

# Start the development server
npm run dev

# In a separate terminal, start the worker
npm run dev:worker
```

The backend server will run on `http://localhost:5000`

### 4. Frontend Setup

```bash
cd my-app

# Install dependencies
npm install

# Create .env.local file with:
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
# CLERK_SECRET_KEY=your_clerk_secret_key
# NEXT_PUBLIC_API_URL=http://localhost:5000

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
CLIENT_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/algoflex
OPENAI_API_KEY=sk-...
CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
QDRANT_URL=http://localhost:6333
REDIS_URL=redis://localhost:6379
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 📡 API Endpoints

### Upload
- `POST /api/upload` - Upload and process PDF documents

### Chat
- `POST /api/chat` - Send messages and receive AI responses

### Keys
- `GET /api/keys` - Retrieve API keys
- `POST /api/keys` - Create/update API keys

### Webhooks
- `POST /api/webhooks` - Handle Clerk webhooks

## 🏗️ Architecture

1. **File Upload Flow**:
   - User uploads PDF via frontend
   - Backend receives file and queues processing job
   - Worker processes PDF, generates embeddings
   - Embeddings stored in Qdrant vector database

2. **Chat Flow**:
   - User sends query via chat interface
   - Backend performs semantic search in Qdrant
   - Retrieved context sent to OpenAI with user query
   - LLM generates contextual response
   - Response returned to user

3. **Background Processing**:
   - BullMQ manages job queue
   - Valkey (Redis) stores queue state
   - Worker processes jobs asynchronously

## 🧪 Development

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Backend Scripts
```bash
npm run dev          # Start server with nodemon
npm run dev:worker   # Start worker with nodemon
```

## 🐳 Docker Services

The `docker-compose.yml` includes:
- **Valkey**: Redis-compatible in-memory data store for queue management
- **Qdrant**: Vector database for similarity search

## 📝 License

ISC

## 👤 Author

Muhammad Inaam ul haq

## 🔗 Repository

[https://github.com/minaamulhaq/AlgoFlex-Rag](https://github.com/minaamulhaq/AlgoFlex-Rag)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if this project helped you!
