import { Ticket , ITicket} from '../entities/Ticket';
import { TicketStatus } from '../interfaces/TicketStatus';

export const ticketRepository = {


  async createTicket(data: ITicket) : Promise<ITicket>{
    return await new Ticket(data).save();
  },


  async getUserTickets(userId: string) : Promise<ITicket[]>{
    return await Ticket.find({userId});
  },

  async findById(id: string) : Promise<ITicket| null>{
    return  await Ticket.findOne({_id: id});
  },

  async addComment(content: string, userId: string, ticket: ITicket) : Promise<ITicket| null>{

    return await Ticket.findByIdAndUpdate(ticket._id, {
      $push: {
        comments: 
        {
          content,
          userId
        }
      },
    });
  },


  async processTicket( userId: string, ticket: ITicket) : Promise<ITicket| null>{

    return await Ticket.findByIdAndUpdate(ticket._id, {
      $set: {
        startedDate: new Date(),
        status: TicketStatus.PROCESSING,
        agentId: userId
      }
    });
  },


  async closeTicket( userId: string, ticket: ITicket) : Promise<ITicket| null>{

    return await Ticket.findByIdAndUpdate(ticket._id, {
      $set: {
        completedDate: new Date(),
        status: TicketStatus.COMPLETED
      }
    });
  }




};