const knex = require('knex');

module.exports = function (app) {
  const { client, connection } = app.get('sqlite');
  const db = knex({ client, connection, useNullAsDefault: true });

  app.set('knexClient', db);
};
