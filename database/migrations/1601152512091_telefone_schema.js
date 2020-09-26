'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TelefoneSchema extends Schema {
  up () {
    this.create('telefones', (table) => {
      table.string('ddd', 3).notNullable()
      table.string('numero-telefone', 10).notNullable()
      table.string('id -user', 254).notNullable()
    })
  }

  down () {
    this.drop('telefones')
  }
}

module.exports = TelefoneSchema
