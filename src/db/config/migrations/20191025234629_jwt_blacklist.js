exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('jwt_blacklist', (table) => {
      table.increments('token_id').primary();
      table.string('token').notNullable();
      table.timestamp('exp').notNullable();
      table.timestamps(true, true);
    })
    // eslint-disable-next-line no-multi-str
      .then(() => knex.raw('\
        CREATE FUNCTION expire_table_delete_old_rows() RETURNS trigger\
          LANGUAGE plpgsql\
          AS $$\
        BEGIN\
          DELETE FROM jwt_blacklist WHERE exp < NOW();\
          RETURN NEW;\
        END;\
        $$;\
\
        CREATE TRIGGER expire_table_delete_old_rows_trigger\
          AFTER INSERT ON jwt_blacklist\
          EXECUTE PROCEDURE expire_table_delete_old_rows();\
      ')),
  ]);
};

exports.down = knex => Promise.all([
  knex.schema.dropTable('jwt_blacklist'),
  knex.schema.raw('DROP FUNCTION expire_table_delete_old_rows'),
]);
