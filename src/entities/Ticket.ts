import mongoose from 'mongoose';
import { TicketStatus } from '../interfaces/TicketStatus';


export interface ITicket extends mongoose.Document {
    title: string,
    decription: string,
    status: TicketStatus,
    startedDate?: Date;
    completedDate?: Date;
    creatorId: string;
    agentId?: string;
    comments?: [
        {
            content: string,
            userId: string;

        }
    ]


}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      index: true,
      required: true
    },
    decription: {
      type: String,
      index: false,
      required: true
    },
    status: {
      type: String,
      index: false,
      enum: Object.values(TicketStatus) ,
      required: true
    },
    startedDate: {
      type: Date,
    },
    completedDate: {
      type: Date,
    },
    creatorId: {
      type: String,
      index: false,
      required: true
    },
    agentId: {
      type: String,
      index: false,
      required: false
    },
    comments: [
      {
        content: {
          type: String,
          index: false,
          required: true
        },
        userId: {
          type: String,
          index: false,
          required: true
        }

      },
      {
        timestamps: true,
      }
    ]
  },
  {
    timestamps: true,
  }
);
  
  
  
const Ticket = mongoose.model<ITicket>('ticket', ticketSchema);
export { Ticket };