const nlpService = require('./nlpService');
const faqModel = require('../models/faqModel');

class ChatbotService {
  // Find FAQ based on processed tokens
  findBestMatch(processedTokens) {
    const faqs = faqModel.getAllFAQs();
    let bestMatch = null;
    let bestScore = 0;
    let matchedKeywords = [];

    for (const faq of faqs) {
      let score = 0;
      const faqKeywordMatches = [];

      for (const keyword of faq.keywords) {
        for (const token of processedTokens) {
          if (keyword.toLowerCase().includes(token) || token.includes(keyword.toLowerCase())) {
            score++;
            if (!faqKeywordMatches.includes(keyword)) {
              faqKeywordMatches.push(keyword);
            }
          }
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = faq;
        matchedKeywords = faqKeywordMatches;
      }
    }

    // Calculate confidence (0 to 1)
    const confidence = bestMatch ? Math.min(bestScore / processedTokens.length, 1) : 0;

    return {
      match: bestMatch,
      score: bestScore,
      confidence: confidence,
      matchedKeywords: matchedKeywords,
    };
  }

  // Main chat function
  chat(userQuestion) {
    // Process the question through NLP
    const nlpResult = nlpService.processText(userQuestion);
    const processedTokens = nlpResult.finalTokens;

    // Find best matching FAQ
    const matchResult = this.findBestMatch(processedTokens);

    return {
      question: userQuestion,
      processedTokens: processedTokens,
      answer: matchResult.match ? matchResult.match.answer : 'Sorry, I don\'t understand your question. Please rephrase it.',
      confidence: matchResult.confidence,
      matchedKeywords: matchResult.matchedKeywords,
      faqId: matchResult.match ? matchResult.match.id : null,
    };
  }
}

module.exports = new ChatbotService();
