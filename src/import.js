'use strict';

const MongoClient = require('mongodb').MongoClient,
      assert = require('assert'),
      natural = require('natural'),
      TfIdf = natural.TfIdf,
      tfidf = new TfIdf(),
      jarvis = require('./services/jarvis').JarvisService,
      database = require('.services/database'),
      documents = require('.services/documents');


let filePattern = process.argv[2];

database.connect()
  .then(function({db, collection}) {
    documents.getDocumentsContent(filePattern)
      .then(contentList => database.addItems(contentList))
      .then((err, result) => {
        assert.equal(contentList.length, result.result.n);
        assert.equal(contentList.length, result.ops.length);
        console.log(`Inserted ${contentList.length} documents into the document collection`);
      });
  });
