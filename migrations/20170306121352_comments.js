//as per nick, I should prolly change the table fields to text (so the blog posts can be longer...can i just edit, then rollback and then rerun? )


exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', function(table){
  table.increments('id').primary();
  table.string('body');
  table.timestamp('comment_timestamp').defaultTo(knex.fn.now());
  table.string('user_email').references('email').inTable('user');
  table.integer('blogpost_id').references('id').inTable('blogpost')
  });
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('comment');
};
