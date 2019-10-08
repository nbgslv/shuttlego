
exports.up = function(knex) {
  return Promise.all([
    knex.schema
      .alterTable('guests', (table) => {
        table.integer('pax').notNullable().defaultTo(1);
      }),
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema
      .table('guests', (table) => {
        table.dropColumn('pax');
      }),
  ]);
};
