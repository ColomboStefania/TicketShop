import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
  } from 'typeorm'
  import { MinLength, IsString, Length } from 'class-validator'

  import Ticket from '../tickets/entity'
  
  @Entity()
  export default class Comment extends BaseEntity {
    
    @PrimaryGeneratedColumn() 
    id?: number
  
    @IsString()
    @Length(5, 350)
    @Column('text', {nullable:true})
    comment: string

    @IsString()
    @MinLength(2)
    @Column('text', { nullable: false })
    commentOwner: string

    @ManyToOne(_ => Ticket, ticket => ticket.comments)
    ticket: Ticket
  
    

  }
  


  
