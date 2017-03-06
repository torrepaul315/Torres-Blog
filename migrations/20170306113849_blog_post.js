
exports.up = function(knex, Promise) {
  return knex.schema.createTable('blogpost', function(table){
  table.increments('id').primary();
  table.string('title');
  table.string('body');
  table.string('user_email').references('email').inTable('user');
  table.timestamp('blogpost_timestamp').defaultTo(knex.fn.now());

  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('blogpost');

};
