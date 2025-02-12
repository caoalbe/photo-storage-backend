/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// exports.up = function(knex) {
export async function up(knex) {
    await knex.schema.createTable('media_tag_assignment', (table) => {
        table.integer('media_id').unsigned().notNullable();
        table.integer('tag_id').unsigned().notNullable();
        table.primary(['media_id', 'tag_id'])
        table.foreign('media_id').references('id').inTable('media').onDelete('CASCADE');
        table.foreign('tag_id').references('id').inTable('tag').onDelete('CASCADE');
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// exports.down = function(knex) {
export async function down(knex) {
  await knex.schema.dropTable('media_tag_assignment')
};
