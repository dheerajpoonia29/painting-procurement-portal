import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Painting extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public artist: string

  @column()
  public painter: string

  @column()
  public bidder: string

  @column()
  public image: string

  @column()
  public date: string

  @column()
  public time: string

  @column()
  public heighest_bid: string

  @column()
  public is_bid_closed: string 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}