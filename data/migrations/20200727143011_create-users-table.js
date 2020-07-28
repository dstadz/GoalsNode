
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl => {
    tbl.increments()
    tbl.string('username', 128).unique().notNullable();
    tbl.string('email', 128).unique().notNullable();
    tbl.date('password', 128).notNullable();
    tbl.date('birthday', 128).notNullable();
  })

  .createTable('goals', tbl => {
    tbl.increments()
    tbl.integer('user_id').unsigned().notNullable().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
    tbl.string('goal', 128).notNullable();
    tbl.date('target_date', 128);
    tbl.boolean('completed').notNullable();

  })

  .createTable('habits', tbl => {
    tbl.increments()
    tbl.string('habit', 128).unique().notNullable();
    tbl.integer('goal_id').unsigned().notNullable().references('id').inTable('goals').onUpdate('CASCADE').onDelete('CASCADE')
    tbl.string('amount', 128).notNullable();
    tbl.integer('freq', 128).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('users')
  .dropTableIfExists('goals')
  .dropTableIfExists('habits')

};
