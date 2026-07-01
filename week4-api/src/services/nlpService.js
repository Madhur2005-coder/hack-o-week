const { STOPWORDS, SPELLING_MAP } = require('../config/constants');

class NLPService {
  // Step 1: Lowercase
  lowercase(text) {
    return text.toLowerCase();
  }

  // Step 2: Remove punctuation
  removePunctuation(text) {
    return text.replace(/[^a-z0-9\s]/g, '');
  }

  // Step 3: Tokenization
  tokenize(text) {
    return text.split(/\s+/).filter(token => token.length > 0);
  }

  // Step 4: Normalize repeated characters (e.g., skillsss → skills)
  normalizeRepeatedChars(word) {
    return word.replace(/(.)\1{2,}/g, '$1$1');
  }

  // Step 5: Remove stopwords
  removeStopwords(tokens) {
    return tokens.filter(token => !STOPWORDS.has(token));
  }

  // Step 6: Spelling normalization
  normalizeSpelling(tokens) {
    return tokens.map(token => {
      const normalized = this.normalizeRepeatedChars(token);
      return SPELLING_MAP[normalized] || normalized;
    });
  }

  // Complete pipeline
  processText(rawText) {
    const steps = {};

    // Step 1: Lowercase
    const lowercased = this.lowercase(rawText);
    steps.lowercased = lowercased;

    // Step 2: Remove punctuation
    const noPunctuation = this.removePunctuation(lowercased);
    steps.noPunctuation = noPunctuation;

    // Step 3: Tokenize
    const tokens = this.tokenize(noPunctuation);
    steps.tokens = tokens;

    // Step 4 & 6: Remove stopwords and normalize spelling
    let processedTokens = this.removeStopwords(tokens);
    steps.afterStopwordRemoval = processedTokens;

    processedTokens = processedTokens.map(token => this.normalizeRepeatedChars(token));
    steps.afterCharNormalization = processedTokens;

    processedTokens = this.normalizeSpelling(processedTokens);
    steps.afterSpellingNormalization = processedTokens;

    return {
      original: rawText,
      processed: steps,
      finalTokens: processedTokens,
    };
  }
}

module.exports = new NLPService();
