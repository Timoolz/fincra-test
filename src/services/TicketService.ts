import { ITicket, Ticket } from '../entities/Ticket';
import CommentRequest from '../interfaces/ICommentRequest';
import TicketRequest from '../interfaces/ITicketRequest';
import { Logger } from '../utils/Logger';
// import { ticketRepository } from '../repositories/TicketRepository';


export const ticketService = {


  async createTicket(userId: string, ticket: TicketRequest): Promise<ITicket>{
    Logger.Info(userId, ticket);
    // const createdTicket = await ticketRepository.createTicket(user);


    return Promise.resolve(new Ticket());
            
  },


  async comment(userId: string, comment: CommentRequest): Promise<ITicket>{
    Logger.Info(userId, comment);
    // const createdTicket = await ticketRepository.createTicket(user);


    return Promise.resolve(new Ticket());
            
  },


  async getUserTickets(userId: string): Promise<ITicket[]>{
    Logger.Info(userId);
    // const createdTicket = await ticketRepository.createTicket(user);


    return Promise.resolve([new Ticket()]);
            
  },




};