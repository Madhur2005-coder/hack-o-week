# Week 4: API Integration Guide

## 🔗 How to Integrate Frontend with Backend API

This guide explains how to connect your Week 3 frontend chatbot with the Week 4 REST API backend.

## Step 1: Start the Backend Server

```bash
cd week4-api
npm install
npm run dev
```

Server will run on `http://localhost:3000`

## Step 2: Update Frontend (Week 3) to Use API

Replace the inline chatbot logic with API calls:

### Original Week 3 Code (Inline Logic)
```javascript
function chatbot() {
    var input = document.getElementById("userInput").value.toLowerCase();
    // ... inline matching logic
}
```

### Updated Code (API Integration)
```javascript
async function chatbot() {
    const input = document.getElementById("userInput").value;
    const chat = document.getElementById("chat");

    if (!input.trim()) return;

    // Display user message
    chat.innerHTML += "<div class='user'><b>You:</b> " + input + "</div>";

    try {
        // Call API endpoint
        const response = await fetch('http://localhost:3000/api/v1/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: input })
        });

        const result = await response.json();

        if (result.success) {
            // Display bot response
            const botResponse = result.data.answer;
            chat.innerHTML += "<div class='bot'><b>Bot:</b> " + botResponse + "</div>";
            
            // Optional: Show confidence and processed tokens
            console.log('Confidence:', result.data.confidence);
            console.log('Processed Tokens:', result.data.processedTokens);
        } else {
            chat.innerHTML += "<div class='bot'><b>Bot:</b> Error processing request</div>";
        }
    } catch (error) {
        console.error('API Error:', error);
        chat.innerHTML += "<div class='bot'><b>Bot:</b> Connection error</div>";
    }

    document.getElementById("userInput").value = "";
    chat.scrollTop = chat.scrollHeight;
}
```

## Step 3: Updated Frontend File (week3-integrated.html)

Save this as `week3-integrated.html` or update your existing `week3` file:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Institute FAQ Chatbot</title>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f2f2f2;
        }
        .chatbox {
            width: 430px;
            margin: 50px auto;
            background: white;
            border-radius: 10px;
            padding: 15px;
            box-shadow: 0 0 10px gray;
        }
        h2 {
            text-align: center;
            color: #333;
        }
        #chat {
            height: 330px;
            overflow-y: auto;
            border: 1px solid #ccc;
            padding: 10px;
            margin-bottom: 10px;
        }
        .user {
            color: blue;
            margin: 5px 0;
        }
        .bot {
            color: green;
            margin: 5px 0;
        }
        input {
            width: 75%;
            padding: 8px;
        }
        button {
            padding: 8px;
            width: 20%;
            background: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background: #45a049;
        }
        .loading {
            color: gray;
            font-style: italic;
        }
    </style>
</head>

<body>

<div class="chatbox">
    <h2>Institute FAQ Chatbot</h2>
    <div id="chat"></div>

    <input type="text" id="userInput" placeholder="Ask your question...">
    <button onclick="chatbot()">Send</button>
</div>

<script>
const API_URL = 'http://localhost:3000/api/v1';

async function chatbot() {
    const input = document.getElementById("userInput").value;
    const chat = document.getElementById("chat");

    if (!input.trim()) return;

    // Display user message
    chat.innerHTML += "<div class='user'><b>You:</b> " + input + "</div>";
    document.getElementById("userInput").value = "";

    // Show loading indicator
    chat.innerHTML += "<div class='loading'>Bot is typing...</div>";

    try {
        // Call API endpoint
        const response = await fetch(API_URL + '/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: input })
        });

        const result = await response.json();

        // Remove loading indicator
        const loadingElements = chat.querySelectorAll('.loading');
        if (loadingElements.length > 0) {
            loadingElements[loadingElements.length - 1].remove();
        }

        if (result.success) {
            // Display bot response
            const botResponse = result.data.answer;
            chat.innerHTML += "<div class='bot'><b>Bot:</b> " + botResponse + "</div>";
            
            // Optional: Log confidence score
            if (result.data.confidence > 0) {
                console.log('Confidence:', (result.data.confidence * 100).toFixed(2) + '%');
            }
        } else {
            chat.innerHTML += "<div class='bot'><b>Bot:</b> Error: " + result.error + "</div>";
        }
    } catch (error) {
        console.error('API Error:', error);
        const loadingElements = chat.querySelectorAll('.loading');
        if (loadingElements.length > 0) {
            loadingElements[loadingElements.length - 1].remove();
        }
        chat.innerHTML += "<div class='bot'><b>Bot:</b> ❌ Connection error - Make sure the server is running</div>";
    }

    chat.scrollTop = chat.scrollHeight;
}

// Allow Enter key to send message
document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        chatbot();
    }
});
</script>

</body>
</html>
```

## Step 4: Testing the Integration

### Option 1: Using the Browser

1. Start the backend: `cd week4-api && npm run dev`
2. Open `week3-integrated.html` in your browser
3. Type a question and hit Send
4. The frontend will call the API and display the response

### Option 2: Using cURL (Command Line)

```bash
# Chat endpoint
curl -X POST http://localhost:3000/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "What is the class timing?"}'

# Process endpoint
curl -X POST http://localhost:3000/api/v1/process \
  -H "Content-Type: application/json" \
  -d '{"text": "Hiii pls tell me about fees"}'

# Get all FAQs
curl http://localhost:3000/api/v1/faqs
```

## API Response Examples

### Example 1: Matching Question
```bash
$ curl -X POST http://localhost:3000/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "What is the class timing?"}'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "question": "What is the class timing?",
    "processedTokens": ["class", "timing"],
    "answer": "Class timings are from 9:00 AM to 4:30 PM.",
    "confidence": 1,
    "matchedKeywords": ["timing", "time", "class time", "hours"],
    "faqId": 2
  }
}
```

### Example 2: Text Processing
```bash
$ curl -X POST http://localhost:3000/api/v1/process \
  -H "Content-Type: application/json" \
  -d '{"text": "Hiii!!! Whats da class timing???"}'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "original": "Hiii!!! Whats da class timing???",
    "processed": {
      "lowercased": "hiii!!! whats da class timing???",
      "noPunctuation": "hiii whats da class timing",
      "tokens": ["hiii", "whats", "da", "class", "timing"],
      "afterStopwordRemoval": ["hiii", "whats", "class", "timing"],
      "afterCharNormalization": ["hi", "what", "class", "timing"],
      "afterSpellingNormalization": ["hi", "what", "class", "timing"]
    },
    "finalTokens": ["hi", "what", "class", "timing"]
  }
}
```

## 🔍 Debugging

### Issue 1: CORS Error
**Error:** `Access to XMLHttpRequest ... blocked by CORS policy`

**Solution:** The backend already has CORS enabled. Make sure you're using the correct URL.

### Issue 2: Connection Refused
**Error:** `Error: connect ECONNREFUSED 127.0.0.1:3000`

**Solution:** Make sure the backend server is running:
```bash
cd week4-api
npm run dev
```

### Issue 3: API Returns Empty Response
**Issue:** The question doesn't match any FAQ

**Solution:** The API will return a default message: "Sorry, I don't understand your question. Please rephrase it."

## 📊 Architecture Overview

```
┌─────────────────────────────────────┐
│      Week 3 Frontend (HTML/JS)      │
│    (Modified with API Integration)  │
└────────────────┬────────────────────┘
                 │
                 │ HTTP POST
                 │ /api/v1/chat
                 │
                 ↓
┌─────────────────────────────────────┐
│      Week 4 API (Node.js/Express)   │
│  ┌──────────────────────────────┐   │
│  │ Chat Controller              │   │
│  └──────────┬───────────────────┘   │
│             │                       │
│  ┌──────────↓───────────────────┐   │
│  │ NLP Service (Week 2 Logic)   │   │
│  │ - Tokenization              │   │
│  │ - Stopword Removal          │   │
│  │ - Spelling Normalization    │   │
│  └──────────┬───────────────────┘   │
│             │                       │
│  ┌──────────↓───────────────────┐   │
│  │ Chatbot Service (Week 3)     │   │
│  │ - Keyword Matching          │   │
│  │ - FAQ Lookup                │   │
│  └──────────┬───────────────────┘   │
│             │                       │
│  ┌──────────↓───────────────────┐   │
│  │ FAQ Model                    │   │
│  │ (In-Memory Database)         │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

## ✅ Integration Checklist

- [ ] Backend server running on port 3000
- [ ] Frontend updated with API integration
- [ ] API endpoint tested with cURL
- [ ] Frontend can successfully send questions
- [ ] Bot responses displaying correctly
- [ ] Confidence scores visible in console
- [ ] Error handling working

## 🚀 Next Steps

1. Add database persistence (MongoDB/PostgreSQL)
2. Add user authentication
3. Store chat history
4. Add admin panel for FAQ management
5. Deploy to production
