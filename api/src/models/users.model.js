/* eslint-disable no-console */

// users-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'users';
  let exists = db.schema.hasTable(tableName).then(async exists => {
    if(!exists) {
        await db.schema.createTable(tableName, table => {
          table.increments('id');
          table.string('name').unique();
          table.string('email').unique();
          table.string('password');
          table.boolean('active').defaultTo(false);
        });
        console.log(`Created ${tableName} table`);
    }
  }).catch(e => {
    console.error(`Error creating ${tableName} table`, e);
  })
  return db;
};
