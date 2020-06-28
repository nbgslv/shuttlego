
exports.up = function(knex) {
  return Promise.all([
    knex.schema
      .createTable('user_permissions', (table) => {
        table.increments('user_permissions_id').primary();
        table.integer('permission_id')
          .references('permission_id')
          .inTable('permissions');
        table.integer('user_id')
          .references('user_id')
          .inTable('users');
        table.timestamps();
      }),
    knex.schema
      .table('users', (table) => {
        table.dropForeign('permissions');
        table.dropColumn('permissions');
      }),
  ]);
};

exports.down = function(knex) {
  knex.schema.dropTable('user_permissions');
  knex.schema.table('users', (table) => {
    table.integer('permissions')
      .references('permission_id')
      .inTable('permissions');
  });
};
