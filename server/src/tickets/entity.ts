import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm'
import {  ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsCurrency, IsUrl, IsString, Length, MinLength } from 'class-validator';
import User from '../users/entity'
import Event from '../events/entity';
import Comment from '../comments/entity';


@Entity()
export default class Ticket extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @MinLength(2)
    @Column('text', { nullable: true })
    ticketName: string

    @IsString()
    @MinLength(2)
    @Column('text', { nullable: true })
    ticketTitle: string
    
    @IsCurrency()
    @Column('int', {nullable:true})
    price: number

    @IsString()
    @Length(5, 350)
    @Column('text', {nullable: true})
    description: string

    @IsUrl()
    @Column('text', {nullable:true})
    picture: string

    @Column('text', {nullable:true}) 
    risk: number

    @ManyToOne(() => User, user => user.tickets )
    seller: User

    @ManyToOne(_ => Event, event => event.tickets)
    event: Event

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @OneToMany(_ => Comment, comment => comment.ticket, { eager: true })
    comments: Comment[]





  
  

}