
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
        table.string('email');
        table.string('phone_number', 30);
        table.integer('session_id');
        // table.foreign('session_id')
        //   .references('session_id')
        //   .inTable('sessions');

        table.timestamps(true, true);
      }),
    knex.schema
      .createTable('sessions', (table) => {
        table.increments('session_id').primary();
        table.dateTime('session_time').notNullable();
        table.dateTime('shuttle_date_time').notNullable();
        table.integer('terminal').notNullable();
        table.integer('large_bags');
        table.integer('medium_bags');
        table.integer('small_bags');
        table.boolean('special_bag').notNullable();
        table.string('special_bag_desc');
        table.boolean('wakeup_call').notNullable();
        table.timestamp('wakeup_time');
        table.boolean('bbox').notNullable();
        table.integer('bbox_number');
        table.integer('guest_id');
        // table.foreign('guest_id')
        //   .references('guest_id')
        //   .inTable('guests');

        table.timestamps(true, true);
      }),
  ]);
};

exports.down = (knex) => Promise.all([
  knex.schema.dropTable('guests'),
  knex.schema.dropTable('sessions'),
]);
