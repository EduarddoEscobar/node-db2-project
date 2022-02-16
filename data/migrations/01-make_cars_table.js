exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable('cars', (tbl) => {
    tbl.increments();
    tbl.string('vin', 17).notNull().unique();
    tbl.string('make', 128).notNull();
    tbl.string('model', 128).notNull();
    tbl.decimal('mileage').notNull();
    tbl.string('title', 128);
    tbl.string('transmission', 128);
  })
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists('cars');
};
