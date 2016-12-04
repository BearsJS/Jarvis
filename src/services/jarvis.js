'use strict';

const natural = require('natural'),
      TfIdf = natural.TfIdf,
      WordPOS = require('wordpos');

exports.JarvisService = class JarvisService {
  constructor(documentsBase) {
    this.tfidf = new TfIdf();
    this.wordpos = new WordPOS();
    this.documentsCount = documentsBase.length;
    documentsBase.forEach(({_id, content}) => this.tdidf.addDocument(natural.PorterStemmer.tokenizeAndStem(content), _id));
  }

  getPOS(question) {
    return new Promise(resolve => {
      this.wordpos.getPOS(question, result => resolve(result));
    });
  }

  getKeywords(question) {
    this.getPOS(question.toLowerCase())
      .then(pos => new Set([...pos.nouns, ...pos.verbs, ...pos.rest]))
      .then(setOfWorld => [...setOfWorld].map(word => natural.LancasterStemmer.stem(word)))
      .then(value => console.log(value));
  }

  giveMeDocuments(question) {
    return new Promise(resove => {
      let documentsCount = 0,
          measures = [];

      this.tfidf.tfidfs(natural.PorterStemmer.tokenizeAndStem(question), (i, measure, key) => {
        measure && measures.push({key, measure});
        if (++documentsCount === this.documentsCount) {
          resolve(measures.sort((i1, i2) => i1.measure < i2.measure ? 1 : -1));
        }
      });
    });
  }
};
