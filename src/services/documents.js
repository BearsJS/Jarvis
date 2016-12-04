'use strict';

const glob = require('glob'),
      natural = require('natural'),
      fs = require('fs'),
      path = require('path');

exports.getDocumentsContent = (pattern) => {
  return new Promise(resolve => {
    let fileList = glob.sync(pattern);
    let contentList = [];
    Array.from(fileList).forEach(filePath => {
      let fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});
      let fileContentTokenized = natural.PorterStemmer.tokenizeAndStem(fileContent);
      contentList.push({
        content: fileContent,
        tokens: [...new Set(fileContentTokenized)],
        type: 'file',
        filename: path.basename(filePath)
      });
    });
    resolve(contentList);
  });
}
