import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Painters extends BaseSchema {
  protected tableName = 'painters'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('address').notNullable().unique()
      table.string('painting_id').notNullable()
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
