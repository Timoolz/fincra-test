
import { ITicket } from '../entities';
import TicketRequest from '../interfaces/ITicketRequest';

import { Response } from 'express';
import { ticketService } from '../services';

import { HandleErrorResponse } from '../utils/errors/ErrorHandlers';
import CommentRequest from '../interfaces/ICommentRequest';
import { IAuthRequest } from '../interfaces/IRequest';
import { UserType } from '../interfaces/UserType';



export const TicketController = {



  async createTicket(request: IAuthRequest, response: Response) {
    try {
    
      const requestBody = request.body as unknown as TicketRequest;
      const userId = request.pricipal.id as unknown as string;
    
      const ticketResponse: ITicket = await ticketService.createTicket(userId, requestBody);
      return response.status(200).json(ticketResponse);
    } catch (error) {
      return HandleErrorResponse(error, response);
    }
  },

  async comment(request: IAuthRequest, response: Response) {
    try {
    
      const requestBody = request.body as unknown as CommentRequest;
      const userId = request.pricipal.id as unknown as string;
      const userType = request.pricipal.role as unknown as UserType;


    
      const ticketResponse: ITicket = await ticketService.comment(userId, requestBody, userType);
      return response.status(200).json(ticketResponse);
    } catch (error) {
      return HandleErrorResponse(error, response);
    }
  },

  async getUserTickets(request: IAuthRequest, response: Response) {
    try {

      const userId = request.pricipal.id as unknown as string;

    
      const ticketResponse: ITicket[] = await ticketService.getUserTickets(userId);
      return response.status(200).json(ticketResponse);
    } catch (error) {
      return HandleErrorResponse(error, response);
    }
  },


};