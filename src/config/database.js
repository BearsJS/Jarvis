'use strict';

module.exports = function() {
  const db_address = process.env.DATABASE_URL || 'localhost',
        db_port = process.env.DATABASE_PORT || 27017,
        db_name = process.env.DATABASE_NAME || 'jarvis';
  return `mongodb://${db_address}:${db_port}/${db_name}`;
};
