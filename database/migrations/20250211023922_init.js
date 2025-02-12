/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// exports.up = function(knex) {
export async function up(knex) {
    await knex.schema.createTable('media', (table) => {
        table.increments('id');
        table.string('filename').notNullable().unique();
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// exports.down = function(knex) {
export async function down(knex) {
    await knex.schema.dropTable("media");
};
