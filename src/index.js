'use strict';

const jarvis = require('./services/jarvis').JarvisService,
      database = require('.services/database');

let question = process.argv[2];

database.connect()
  .then(function({db, collection}) {
    database.findAll()
      .then((err, items) => {
        return new jarvis(items).giveMeDocuments(question)
      })
      .then(function(documents) {
        console.log('God speaks to us:', documents);
        process.exit();
      });
  });
