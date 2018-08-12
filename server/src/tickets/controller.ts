import {
    JsonController,
    HttpCode,
    Post,
    Body,
    Param,
    NotFoundError,
    Get,
    Authorized,
    Patch,

  } from 'routing-controllers'
  import Ticket from './entity'
  import Event from '../events/entity'



  @JsonController()
  export default class TicketController {
    @Authorized()
    @Post('/tickets')
    @HttpCode(201)
    async addTicket(@Body() data: Ticket) {
      const { id, ...rest } = data

      console.log(data)
  
      const ticket = await Ticket.create(rest)
      
      const ticketEvent = await Event.findOneById(id)
   
      console.log(ticketEvent)
   
      if (!ticketEvent) throw new NotFoundError('whats happening.')
      
      ticket.event = ticketEvent

      const prices = ticketEvent.tickets.map(item => item.price)
      const totalPrice = prices.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      const average = totalPrice/prices.length
      const delta = ticket.price - average
      const deltaInProportionWithAveragePrice = delta / average
      const deltaPricePropInPercentage = deltaInProportionWithAveragePrice * 100
      const now = new Date()
      const nowHour = now.getHours()
      // const timeOfCreation = ticket.created_at
      console.log(nowHour)

      const hasCreatedBefore = !!ticketEvent.tickets.find(item => item.ticketName === ticket.ticketName)

      ticket.risk = 0
      if (hasCreatedBefore) { ticket.risk += 10}
      if (deltaPricePropInPercentage < 0) { ticket.risk += (deltaPricePropInPercentage * -1) }
      if (deltaPricePropInPercentage > 0) { ticket.risk  -= deltaPricePropInPercentage }
   
      if (nowHour > 9 && nowHour < 17) 
        {ticket.risk -= 10} 
        else 
        {ticket.risk +=10}


      if (ticket.risk < 5) {ticket.risk = 5}
      if (ticket.risk > 95) {ticket.risk = 95}

      await ticket.save()
  
      const ticket1 = await Ticket.findOneById(id)
  
      return { ticket1 }
    }

    
    @Get('/ticket/:id')
    @HttpCode(201)
    async getTicket(@Param('id') id: number) {
      const ticket = await Ticket.findOneById(id)
      if (!ticket) throw new NotFoundError('No ticket found.')
      return { ticket }
    }

    @Authorized()
    @Patch('/ticket/:id')
    async updateTicket(
      @Param('id') id: number,
      @Body() update: Partial<Ticket>,
     
    ) {
        console.log(id)
        const ticket = await Ticket.findOneById({id: id})
        if (!ticket) throw new NotFoundError('Cannot find this!')
        return Ticket.merge(ticket, update).save()
    }

   
  }
  
    