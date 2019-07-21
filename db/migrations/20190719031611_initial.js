
exports.up = (knex) => {
  return Promise.all([
    knex.schema
      .createTable('guests', (table) => {
        table.increments('guest_id').primary();
        table.string('first_name');
        table.string('last_name');
        table.integer('room_number').notNullable();
        table.dateTime('check_in_date').notNullable();
        table.dateTime('check_out_date');
        table.dateTime('session_time');
        table.string('email');
        table.string('phone_number', 30);

        table.timestamps(true, true);
      }),
    knex.schema
      .createTable('sessions', (table) => {
        table.increments('session_id').primary();
        table.dateTime('session_time').notNullable();
        table.dateTime('shuttle_date_time');
        table.integer('terminal');
        table.integer('large_bags');
        table.integer('medium_bags');
        table.integer('small_bags');
        table.boolean('special_bag');
        table.string('special_bag_desc');
        table.boolean('wakeup_call');
        table.timestamp('wakeup_time');
        table.boolean('bbox');
        table.integer('bbox_number');
        table.integer('guest_id').notNullable();

        table.timestamps(true, true);
      }),
  ]);
};

exports.down = knex => Promise.all([
  knex.schema.dropTable('guests'),
  knex.schema.dropTable('sessions'),
]);
