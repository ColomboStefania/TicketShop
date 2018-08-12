import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne
  } from 'typeorm'
  import { MinLength, IsString, IsDateString, IsUrl, Length } from 'class-validator'
  import User from '../users/entity'
  import Ticket from '../tickets/entity'
  
  @Entity()
  export default class Event extends BaseEntity {
    
    @PrimaryGeneratedColumn() id?: number
  
    @IsString()
    @MinLength(2)
    @Column('text', { nullable: false })
    eventName: string
  
    @IsString()
    @Length(5, 350)
    @Column('text', {nullable:true})
    description: string

    @IsDateString()
    @Column('date', { nullable: true })
    startDate: Date

    @IsDateString()
    @Column('date', { nullable: true })
    endDate: Date

    @IsUrl()
    @Column('text', {nullable:true})
    picture: string

    @ManyToOne(_ => User, user => user.events)
    owner: User
  
    @OneToMany(_ => Ticket, ticket => ticket.event, { eager: true })
    tickets: Ticket[]


  }
  