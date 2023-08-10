import { Ticket , ITicket} from '../entities/Ticket';

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
  }


};