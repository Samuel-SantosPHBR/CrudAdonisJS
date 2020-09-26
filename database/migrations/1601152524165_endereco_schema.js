'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnderecoSchema extends Schema {
  up () {
    this.create('enderecos', (table) => {
      table.string('cep', 254).notNullable()
      table.string('bairro', 254).notNullable()
      table.string('estado', 254).notNullable()
      table.string('cidade', 254).notNullable()
      table.string('logradouro', 254).notNullable()
      table.string('id-user', 254).notNullable()
    })
  }

  down () {
    this.drop('enderecos')
  }
}

module.exports = EnderecoSchema
