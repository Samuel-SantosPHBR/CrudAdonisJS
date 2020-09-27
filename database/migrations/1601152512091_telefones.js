'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TelefoneSchema extends Schema {
  up () {
    this.create('telefones', (table) => {
      table.increments();
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onUpdate("CASCADE").onDelete("CASCADE");
      table.string('ddd', 10).notNullable()
      table.string('numero_telefone', 10).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('telefones')
  }
}

module.exports = TelefoneSchema
