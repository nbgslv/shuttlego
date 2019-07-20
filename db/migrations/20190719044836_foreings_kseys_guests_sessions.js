
exports.up = function (knex) {
  return Promise.all([
    knex.schema.alterTable('guests', (table) => {
      table.foreign('session_id')
        .references('session_id')
        .inTable('sessions');
    }),
    knex.schema.alterTable('sessions', (table) => {
      table.foreign('guest_id')
        .references('guest_id')
        .inTable('guests');
    }),
  ]);
};

exports.down = function (knex) {
  Promise.all([
    knex.schema.alterTable('guests', (table) => {
      table.dropColumn('session_id');
    }),
    knex.schema.alterTable('sessions', (table) => {
      table.dropColumn('guest_id');
    }),
  ]);
};
