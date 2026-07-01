const { FAQ_DATA } = require('../config/constants');

class FAQModel {
  constructor() {
    this.faqs = FAQ_DATA;
  }

  getAllFAQs() {
    return this.faqs;
  }

  getFAQById(id) {
    return this.faqs.find(faq => faq.id === id);
  }

  searchFAQByKeyword(keyword) {
    return this.faqs.filter(faq =>
      faq.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase()))
    );
  }

  addFAQ(keywords, answer) {
    const newId = Math.max(...this.faqs.map(f => f.id)) + 1;
    const newFAQ = { id: newId, keywords, answer };
    this.faqs.push(newFAQ);
    return newFAQ;
  }
}

module.exports = new FAQModel();
