'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('nome', 254).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('endereco', 254).notNullable()
      table.string('telefone', 15).notNullable()
      table.string('senha', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
