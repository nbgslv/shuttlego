
exports.up = function (knex) {
  return Promise.all([
    knex.schema.alterTable('sessions', (table) => {
      table.foreign('guest_id')
        .references('guest_id')
        .inTable('guests');
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.table('sessions', (table) => {
      table.dropForeign(['guest_id'], 'sessions_guest_id_foreign');
    }),
  ]);
};
