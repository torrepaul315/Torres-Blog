var knex = require('../db/knex');
function user() {
  return knex('user');
}
