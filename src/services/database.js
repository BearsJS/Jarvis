(function () {
  'use strict';

  const mongodb = require('mongodb'),
        MongoClient = mongodb.MongoClient,
        assert = require('assert'),
        configDB = require('../config/database')();

  let collection, database;

  exports.connect = () => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(configDB, (err, db) => {
        assert.equal(null, err);
        console.log('Connected successfully to database.');
        database = db;
        collection = db.collection('documents');
        resolve({database, collection});
      })
    });
  };

  exports.findAll = () => {
    return new Promise(resolve => {
      collection.find({}).toArray((err, items) => {
        assert.equal(null, err);
        resolve(err, items);
      });
    });
  };

  exports.addItem = (item) => {
    return new Promise(resolve => {
      collection.insertOne(item, (err, result) => {
          assert.equal(null, err);
          resolve(err, result);
      });
    });
  };

  exports.addItems = (items) => {
    return new Promise(resolve => {
      collection.insertMany(items, (err, result) => {
          assert.equal(null, err);
          resolve(err, result);
      });
    });
  };

  exports.deleteItem = (item) => {
    return new Promise(resolve => {
      collection.deleteOne({_id: new mongodb.ObjectID(item.id)}, (err, result) => {
          assert.equal(null, err);
          resolve(err, result);
      });
    });
  };
})();
