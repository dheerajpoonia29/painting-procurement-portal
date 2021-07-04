import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Paintings extends BaseSchema {
  protected tableName = 'paintings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable()
      table.string('artist').notNullable()
      table.string('painter').notNullable()
      table.string('bidder')
      table.string('image').notNullable()
      table.string('date').notNullable()
      table.string('time').notNullable()
      table.string('heighest_bid').notNullable()
      table.string('is_bid_closed').notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
