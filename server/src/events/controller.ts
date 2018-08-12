import {
    JsonController,
    HttpCode,
    Post,
    Body,
    Get,
    Param,
    NotFoundError,
 
    Authorized
  } from 'routing-controllers'
  import Event from './entity'
  
  @JsonController()
  export default class EventController {
    @Authorized()
    @Post('/form')
    @HttpCode(201)
    async createEvent(@Body() data: Event) {
      console.log("haai?")
      const event = await Event.create(data).save()
      console.log(event)
      const newEvent = await Event.findOneById(event.id)
      return newEvent
    }
  


    @Get('/events')
    async getEvents() {
      const events = await Event.find()
      return { events }
    }

  

    @Get('/events/:id')
    async getEvent(@Param('id') id: number) {
      const event = await Event.findOneById(id)
      if (!event) throw new NotFoundError('Event not found.')
      return { event }
    }


  }
  