# Week 4: Chatbot REST API Backend

## 🎯 Overview
This is a complete REST API backend that integrates:
- **Week 2 NLP**: Text preprocessing with stopword removal and spelling normalization
- **Week 3 Frontend**: Enhanced FAQ chatbot with synonym matching
- **Week 4 API**: RESTful endpoints for chatbot interactions

## 📋 Features

✅ **NLP Text Processing**
  - Stopword removal
  - Spelling normalization
  - Tokenization
  - Repeated character normalization

✅ **REST API Endpoints**
  - POST `/api/v1/chat` - Send user question and get bot response
  - GET `/api/v1/faqs` - Get all FAQ entries
  - POST `/api/v1/process` - Process raw text input
  - GET `/api/v1/health` - Health check

✅ **Request Validation**
  - Input validation with Joi
  - Error handling middleware
  - Proper HTTP status codes

## 🚀 Quick Start

### Prerequisites
- Node.js >= 14.x
- npm or yarn

### Installation

```bash
cd week4-api
npm install
```

### Configuration

```bash
cp .env.example .env
```

### Running the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs on `http://localhost:3000`

## 📡 API Endpoints

### 1. Chat Endpoint (Main Feature)
```bash
POST /api/v1/chat
Content-Type: application/json

{
  "question": "What is the class timing?"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "question": "What is the class timing?",
    "processedTokens": ["class", "timing"],
    "answer": "Class timings are from 9:00 AM to 4:30 PM.",
    "confidence": 0.95,
    "matchedKeywords": ["timing", "time", "class time", "hours"]
  }
}
```

### 2. Process Text Endpoint
```bash
POST /api/v1/process
Content-Type: application/json

{
  "text": "Hii!!! Whats da class timing???"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "original": "Hii!!! Whats da class timing???",
    "processed": {
      "lowercased": "hii!!! whats da class timing???",
      "noPunctuation": "hiii whats da class timing",
      "tokens": ["hiii", "whats", "da", "class", "timing"],
      "afterStopwordRemoval": ["hiii", "whats", "class", "timing"],
      "afterSpellingNormalization": ["hi", "what", "class", "timing"],
      "afterCharNormalization": ["hi", "what", "class", "timing"]
    }
  }
}
```

### 3. Get All FAQs
```bash
GET /api/v1/faqs
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "keywords": ["name", "college name", "institute name"],
      "answer": "Our institute name is ABC Institute of Technology."
    },
    ...
  ]
}
```

### 4. Health Check
```bash
GET /api/v1/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-03-12T12:00:00.000Z"
}
```

## 🏗️ Project Structure

```
week4-api/
├── src/
│   ├── server.js              # Express server entry point
│   ├── app.js                 # Express app configuration
│   ├── config/
│   │   └── constants.js       # Constants and config
│   ├── models/
│   │   └── faqModel.js        # FAQ data model
│   ├── services/
│   │   ├── nlpService.js      # NLP processing (Week 2 logic)
│   │   └── chatbotService.js  # Chatbot logic (Week 3 integration)
│   ├── controllers/
│   │   └── chatController.js  # Request handlers
│   ├── middleware/
│   │   ├── errorHandler.js    # Error handling
│   │   └── validator.js       # Input validation
│   └── routes/
│       └── chatRoutes.js      # API routes
├── tests/
│   └── chat.test.js           # Unit tests
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## 🔄 Data Flow

```
User Request (Question)
     ↓
Input Validation (Joi)
     ↓
NLP Processing (Week 2 Logic)
  - Lowercase
  - Remove punctuation
  - Tokenize
  - Remove stopwords
  - Normalize spelling
  - Normalize repeated chars
     ↓
Keyword Matching (Week 3 Logic)
  - Match against FAQ keyword groups
  - Find best match
     ↓
Generate Response
  - Include processed tokens
  - Include confidence score
  - Return matched answer
     ↓
JSON Response to Frontend
```

## 🧪 Testing

Run test suite:
```bash
npm test
```

### Example cURL Commands

**Chat:**
```bash
curl -X POST http://localhost:3000/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "What are the fees?"}'
```

**Process Text:**
```bash
curl -X POST http://localhost:3000/api/v1/process \
  -H "Content-Type: application/json" \
  -d '{"text": "Hiii pls tell me about courses"}'
```

**Get FAQs:**
```bash
curl http://localhost:3000/api/v1/faqs
```

## 📊 Integration Timeline

| Week | Component | Status |
|------|-----------|--------|
| 1 | Basic HTML Chatbot | ✅ Complete |
| 2 | NLP Text Preprocessing | ✅ Complete |
| 3 | Enhanced Chatbot with Synonyms | ✅ Complete |
| 4 | REST API Backend | ✅ Complete |

## 🔗 Next Steps

1. Connect frontend (Week 3) to this API
2. Add database integration for FAQ management
3. Add user authentication
4. Add chat history storage
5. Deploy to production

## 📝 License

MIT License
