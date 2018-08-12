import {
    JsonController,
    HttpCode,
    Post,
    Body,
    Get,
    // BodyParam,
    Param,
    NotFoundError
    
  } from 'routing-controllers'

  import Comment from './entity'
  import Ticket from '../tickets/entity'

  @JsonController()
  export default class CommentController {

    @Post('/currentTicket/:id')
    @HttpCode(201)
    async addComment(
      @Body() data,
      @Param('id') ticketId: number
     
    ) {
      const { ...rest } = data
        console.log(ticketId)
        const ticket = await Ticket.find({ where: { id: ticketId }});
        if (!ticket) throw new NotFoundError(`ticket #${ticketId} does not exist.`)
     
        // console.log("found the ticket")
        const comment = await Comment.create({
          ...rest})
      comment.ticket = ticket[0]
        await comment.save()
          
    
        return { comment }
  
      }
  
      // @Post('/currentTicket')
      // @HttpCode(201)
      // async addComment(
      //   @Body() comments : Comment,
      //   @BodyParam() ticket: Ticket
      // ) {
      //     comments.ticket = ticket
         
      //     const entity = await comments.save()
          
      //     return { entity }
    
      //   }
  

    @Get('/comments/:id')
    async getComment(@Param('id') id: number) {
      const comment = await Comment.findOneById(id)
  
      if (!comment) throw new NotFoundError('Comment not found.')
  
      return { comment }
    }
  
 
}
  

