import { ITicket } from '../entities/Ticket';
import CommentRequest from '../interfaces/ICommentRequest';
import TicketRequest from '../interfaces/ITicketRequest';
import { ticketRepository } from '../repositories/TicketRepository';
import { TicketStatus } from '../interfaces/TicketStatus';
import { BadRequest, ResourceNotFoundError } from '../utils/errors/ErrorHandlers';
import { UserType } from '../interfaces/UserType';
import { StatusResponse } from '../interfaces/IResponse';


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
    const tickets = await ticketRepository.getUserTickets(userId);

    return Promise.resolve(tickets);
            
  },

  async getAllTickets(): Promise<ITicket[]>{
    const tickets = await ticketRepository.getAllTickets();

    return Promise.resolve(tickets);
            
  },

  async getRecentlyClosedTickets(): Promise<ITicket[]>{
    const tickets = await ticketRepository.getRecentlyClosedTickets();

    return Promise.resolve(tickets);
            
  },

  

  async getTicket(ticketId: string): Promise<ITicket>{

    const ticket = await ticketRepository.findById(ticketId);
    if(!ticket){
      throw new ResourceNotFoundError({message: 'Ticket not found'});
    }
    return Promise.resolve(ticket);
            
  },


  async processTicket(userId: string, ticketId: string): Promise<StatusResponse>{

    const ticket = await ticketRepository.findById(ticketId);

    if(!ticket){
      throw new ResourceNotFoundError({message: 'Ticket not found'});
    }

    if( ticket.status !== TicketStatus.CREATED ){
      throw new BadRequest({message: 'Cannot process ticket with this status'});
    }


    await ticketRepository.processTicket( userId, ticket);
    return Promise.resolve({successful: true, message: 'Processing ticket'});


            
  },


  async closeTicket(userId: string, ticketId: string): Promise<StatusResponse>{

    const ticket = await ticketRepository.findById(ticketId);

    if(!ticket){
      throw new ResourceNotFoundError({message: 'Ticket not found'});
    }

    if( ticket.status !== TicketStatus.PROCESSING ){
      throw new BadRequest({message: 'Cannot close ticket with this status'});
    }

    await ticketRepository.closeTicket( userId, ticket);
    return Promise.resolve({successful: true, message: 'Closed ticket'});


            
  },




};