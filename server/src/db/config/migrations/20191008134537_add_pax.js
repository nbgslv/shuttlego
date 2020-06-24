
exports.up = function(knex) {
  return Promise.all([
    knex.schema
      .alterTable('sessions', (table) => {
        table.integer('pax').notNullable().defaultTo(1);
      }),
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema
      .table('sessions', (table) => {
        table.dropColumn('pax');
      }),
  ]);
};
