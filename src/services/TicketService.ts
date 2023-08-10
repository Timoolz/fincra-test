import { ITicket, Ticket } from '../entities/Ticket';
import CommentRequest from '../interfaces/ICommentRequest';
import TicketRequest from '../interfaces/ITicketRequest';
import { Logger } from '../utils/Logger';
import { ticketRepository } from '../repositories/TicketRepository';
import { TicketStatus } from '../interfaces/TicketStatus';
import { BadRequest, ResourceNotFoundError } from '../utils/errors/ErrorHandlers';
import { UserType } from '../interfaces/UserType';


export const ticketService = {


  async createTicket(userId: string, ticket: TicketRequest): Promise<ITicket>{

    const createdTicket = await ticketRepository.createTicket({
      title: ticket.title,
      decription: ticket.description,
      status: TicketStatus.CREATED,
      creatorId: userId
    } as unknown as ITicket);


    return Promise.resolve(createdTicket);
            
  },


  async comment(userId: string, comment: CommentRequest, userType: UserType): Promise<any>{
      
    let ticket = await ticketRepository.findById(comment.ticketId);

    if(!ticket){
      throw new ResourceNotFoundError({message: 'Ticket not found'});
    }

    if( userType === UserType.USER && (!ticket.comments || ticket.comments?.length < 1)){
      throw new BadRequest({message: 'No agent has commented on the ticket'});

    }

    ticket = await ticketRepository.addComment( comment.content, userId, ticket);

    return Promise.resolve(ticket);
            
  },


  async getUserTickets(userId: string): Promise<ITicket[]>{
    Logger.Info(userId);
    const tickets = await ticketRepository.getUserTickets(userId);


    return Promise.resolve(tickets);
            
  },




};