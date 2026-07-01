const express = require('express');
const chatController = require('../controllers/chatController');
const { validate, chatSchema, processSchema } = require('../middleware/validator');

const router = express.Router();

const API_VERSION = 'v1';

// Chat endpoint
router.post(`/${API_VERSION}/chat`, validate(chatSchema), chatController.chat);

// Process text endpoint
router.post(`/${API_VERSION}/process`, validate(processSchema), chatController.processText);

// FAQ endpoints
router.get(`/${API_VERSION}/faqs`, chatController.getFAQs);
router.get(`/${API_VERSION}/faqs/:id`, chatController.getFAQById);
router.get(`/${API_VERSION}/faqs/search`, chatController.searchFAQs);

module.exports = router;
