
exports.up = (knex) => {
  return Promise.all([
    knex.schema
      .createTable('guests', (table) => {
        table.increments('guest_id').primary();
        table.string('first_name');
        table.string('last_name');
        table.string('email');
        table.string('phone_number', 30);
        table.timestamps(true, true);
      }),
    knex.schema
      .createTable('sessions', (table) => {
        table.increments('session_id').primary();
        table.integer('room_number').notNullable();
        table.string('check_in_date').notNullable();
        table.string('check_out_date');
        table.string('verf_code');
        table.integer('session_time_hour').notNullable();
        table.integer('session_time_minute').notNullable();
        table.string('shuttle_date');
        table.integer('shuttle_time_hour');
        table.integer('shuttle_time_minute');
        table.integer('terminal');
        table.integer('large_bags').defaultTo(0);
        table.integer('medium_bags').defaultTo(0);
        table.integer('small_bags').defaultTo(0);
        table.boolean('special_bag');
        table.string('special_bag_desc');
        table.boolean('wakeup_call');
        table.string('wakeup_time_date');
        table.integer('wakeup_time_hour');
        table.integer('wakeup_time_minute');
        table.boolean('bbox');
        table.integer('bbox_number');
        table.integer('guest_id').notNullable();
        table.string('status').notNullable().defaultTo('pending');
        table.timestamps(true, true);
      }),
  ]);
};

exports.down = knex => Promise.all([
  knex.schema.dropTable('sessions'),
  knex.schema.dropTable('guests'),
]);
