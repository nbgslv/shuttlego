
exports.up = function(knex) {
  return Promise.all([
    knex.schema
      .createTable('admin_config', (table) => {
        table.increments('config_id').primary();
        table.string('session_time_default_type').notNullable();
        table.json('session_time_default_params');
        table.string('guest_reset').notNullable();
        table.json('guest_reset_params');
        table.boolean('session_edit_by_guest').notNullable();
        table.json('required_guest_fields').notNullable();
        table.string('shuttle_times_type').notNullable();
        table.json('shuttle_times_params').notNullable();
        table.json('delete_guests_time').notNullable();
        table.boolean('delete_guests_with_sessions').notNullable();
        table.json('delete_sessions_time').notNullable();
        table.json('auto_approve_request').notNullable();
      }),
    knex.schema
      .createTable('users', (table) => {
        table.increments('user_id').primary();
        table.string('user_name').notNullable();
        table.string('password').notNullable();
        table.string('email');
        table.string('phone_number');
        table.boolean('active').defaultTo(true);
        table.timestamps();
      }),
    knex.schema
      .createTable('permissions', (table) => {
        table.increments('permission_id').primary();
        table.string('permission_name').notNullable();
        table.string('permission_params').notNullable();
        table.boolean('active').defaultTo(true);
      }),
    knex.schema
      .createTable('notifications', (table) => {
        table.increments('notification_id').primary();
        table.string('event_type').notNullable();
        table.string('message').notNullable();
        table.string('delay');
        table.timestamps();
      }),
    knex.schema
      .createTable('requests', (table) => {
        table.increments('request_id').primary();
        table.string('request_name').notNullable();
        table.json('request_approval_terms');
        table.json('request_approval_params');
        table.boolean('active').defaultTo(true);
        table.timestamps();
      }),
    knex.schema
      .createTable('messages', (table) => {
        table.increments('message_id').primary();
        table.string('message_name').notNullable();
        table.increments('title').notNullable();
        table.text('message');
        table.boolean('active').defaultTo(true);
        table.timestamps();
      }),
    knex.schema
      .createTable('reports', (table) => {
        table.increments('report_id').primary();
        table.string('report_name').notNullable();
      }),
    knex.schema
      .createTable('reports_delivery_list', (table) => {
        table.increments('delivery_id').primary();
        table.string('send_to');
        table.string('send_trigger').notNullable();
        table.string('send_parameters');
        table.timestamps();
      }),
    knex.schema
      .createTable('blacklist', (table) => {
        table.increments('list_id').primary();
        table.timestamps();
      }),
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('admin_config'),
    knex.schema.dropTable('messages'),
    knex.schema.dropTable('notifications'),
    knex.schema.dropTable('permissions'),
    knex.schema.dropTable('requests'),
    knex.schema.dropTable('reports'),
    knex.schema.dropTable('reports_delivery_list'),
    knex.schema.dropTable('blacklist'),
    knex.schema.dropTable('users'),
  ]);
};
