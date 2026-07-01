const chatbotService = require('../services/chatbotService');
const nlpService = require('../services/nlpService');
const faqModel = require('../models/faqModel');

// Chat endpoint
const chat = async (req, res, next) => {
  try {
    const { question } = req.body;

    if (!question || question.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Question cannot be empty',
      });
    }

    const result = chatbotService.chat(question);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Process text endpoint
const processText = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Text cannot be empty',
      });
    }

    const result = nlpService.processText(text);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Get all FAQs
const getFAQs = async (req, res, next) => {
  try {
    const faqs = faqModel.getAllFAQs();

    res.json({
      success: true,
      count: faqs.length,
      data: faqs,
    });
  } catch (error) {
    next(error);
  }
};

// Get single FAQ
const getFAQById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const faq = faqModel.getFAQById(parseInt(id));

    if (!faq) {
      return res.status(404).json({
        success: false,
        error: 'FAQ not found',
      });
    }

    res.json({
      success: true,
      data: faq,
    });
  } catch (error) {
    next(error);
  }
};

// Search FAQs by keyword
const searchFAQs = async (req, res, next) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({
        success: false,
        error: 'Keyword parameter required',
      });
    }

    const results = faqModel.searchFAQByKeyword(keyword);

    res.json({
      success: true,
      query: keyword,
      count: results.length,
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  chat,
  processText,
  getFAQs,
  getFAQById,
  searchFAQs,
};
