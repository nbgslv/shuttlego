exports.up = function(knex) {
  return Promise.all([
    knex.schema.alterTable('notifications', (table) => {
      table
        .integer('user_id')
        .references('user_id')
        .inTable('users');
    }),
    knex.schema.alterTable('users', (table) => {
      table
        .integer('permissions')
        .references('permission_id')
        .inTable('permissions');
    }),
    knex.schema.alterTable('reports_delivery_list', (table) => {
      table
        .integer('user_id')
        .references('user_id')
        .inTable('users');
      table
        .integer('report_id')
        .references('report_id')
        .inTable('reports');
    }),
    knex.schema.alterTable('blacklist', (table) => {
      table
        .integer('guest_id')
        .references('guest_id')
        .inTable('guests');
    }),
  ]);
};

exports.down = function(knex) {
  knex.schema.table('notifications', (table) => {
    table.dropForeign(['user_id'], 'notifications_user_id_foreign');
  });
  knex.schema.table('reports_delivery_list', (table) => {
    table.dropForeign(['user_id'], 'reports_delivery_list_user_id_foreign');
    table.dropForeign(['report_id'], 'reports_delivery_list_report_id_foreign');
  });
  knex.schema.table('blacklist', (table) => {
    table.dropForeign(['guest_id'], 'blacklist_guest_id_foreign');
  });
  knex.schema.table('users', (table) => {
    table.dropForeign(['permission_id'], 'users_permission_id_foreign');
  });
};
