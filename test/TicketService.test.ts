import { ticketService } from '../src/services/TicketService';
import { ticketRepository } from '../src/repositories/TicketRepository';
import { TicketStatus } from '../src/interfaces/TicketStatus';
import { BadRequest, ResourceNotFoundError } from '../src/utils/errors/ErrorHandlers';
import { UserType } from '../src/interfaces/UserType';
import { IError } from '../src/interfaces';



const mockCreateTicket = jest.fn();
const mockfAddComment = jest.fn();
const mockfindTicketById = jest.fn();
const mockgetUserTickets = jest.fn();
const mockGwtRecentlyClosedTickets = jest.fn();
const mockgetAllTickets = jest.fn();
const mockProcessTicket = jest.fn();
const mockCloseTicket = jest.fn();


describe('TicketService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    ticketRepository.createTicket = mockCreateTicket;
    ticketRepository.addComment = mockfAddComment;
    ticketRepository.findById = mockfindTicketById;
    ticketRepository.getUserTickets = mockgetUserTickets;
    ticketRepository.getRecentlyClosedTickets = mockGwtRecentlyClosedTickets;
    ticketRepository.getAllTickets = mockgetAllTickets;
    ticketRepository.processTicket = mockProcessTicket;
    ticketRepository.closeTicket = mockCloseTicket;


  });


  

  describe('createTicket', () => {
    it('should create a support ticket successfully', async () => {
      const userId = 'user123';
      const ticketRequest = {
        title: 'Test Ticket',
        description: 'Test description',
      };

      const createdTicket = {
        _id: 'ticket123',
        title: 'Test Ticket',
        description: 'Test description',
        status: TicketStatus.CREATED,
        creatorId: userId,
      };

      mockCreateTicket.mockResolvedValue(createdTicket);

      const result = await ticketService.createTicket(userId, ticketRequest);

      expect(mockCreateTicket).toHaveBeenCalledWith({
        title: ticketRequest.title,
        decription: ticketRequest.description,
        status: TicketStatus.CREATED,
        creatorId: userId,
      } as any);
      expect(result).toEqual(createdTicket);
    });
  });

  describe('comment', () => {
    it('should add a comment to a ticket', async () => {
      const userId = 'user123';
      const commentRequest = {
        ticketId: 'ticket123',
        content: 'Test comment',
      };
      const userType = UserType.USER;

      const ticket = {
        _id: 'ticket123',
        comments: [
          {
            userId,
            content: commentRequest.content,
            createdAt: new Date(),
          },
        ],
      };

      mockfindTicketById.mockResolvedValue(ticket);
      mockfAddComment.mockResolvedValue({
        ...ticket,
        comments: [
          {
            userId,
            content: commentRequest.content,
            createdAt: new Date(),
          },
        ],
      });

      const result = await ticketService.comment(userId, commentRequest, userType);

      expect(mockfindTicketById).toHaveBeenCalledWith(commentRequest.ticketId);
      expect(mockfAddComment).toHaveBeenCalledWith(
        commentRequest.content,
        userId,
        ticket
      );
      expect(result).toEqual(ticket);
    });

    it('should throw BadRequest if user type is USER and no agent comment', async () => {
      const userId = 'user123';
      const commentRequest = {
        ticketId: 'ticket123',
        content: 'Test comment',
      };
      const userType = UserType.USER;

      const ticket = {
        _id: 'ticket123',
        comments: [],
      };

      mockfindTicketById.mockResolvedValue(ticket);

      try {
        await ticketService.comment(userId, commentRequest, userType);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequest);
      }
    });

    it('should throw ResourceNotFoundError if ticket not found', async () => {
      const userId = 'user123';
      const commentRequest = {
        ticketId: 'nonexistent',
        content: 'Test comment',
      };
      const userType = UserType.USER;

      mockfindTicketById.mockResolvedValue(null);

      try {
        await ticketService.comment(userId, commentRequest, userType);
      } catch (error) {
        expect(error).toBeInstanceOf(ResourceNotFoundError);
      }
    });
  });



  
  describe('getUserTickets', () => {
    it('should get all tickets for a user', async () => {
      const userId = 'user123';
      const userTickets = [
        {
          _id: 'ticket123',
          title: 'Ticket 1',
          description: 'Description 1',
          status: TicketStatus.CREATED,
          creatorId: userId,
        },
        {
          _id: 'ticket456',
          title: 'Ticket 2',
          description: 'Description 2',
          status: TicketStatus.PROCESSING,
          creatorId: userId,
        },
      ];
  
      mockgetUserTickets.mockResolvedValue(userTickets);
  
      const result = await ticketService.getUserTickets(userId);
  
      expect(ticketRepository.getUserTickets).toHaveBeenCalledWith(userId);
      expect(result).toEqual(userTickets);
    });
  });
  
  describe('getAllTickets', () => {
    it('should get all tickets', async () => {
      const allTickets = [
        {
          _id: 'ticket123',
          title: 'Ticket 1',
          description: 'Description 1',
          status: TicketStatus.CREATED,
          creatorId: 'user123',
        },
        {
          _id: 'ticket456',
          title: 'Ticket 2',
          description: 'Description 2',
          status: TicketStatus.PROCESSING,
          creatorId: 'user456',
        },
      ];
  
      mockgetAllTickets.mockResolvedValue(allTickets);
  
      const result = await ticketService.getAllTickets();
  
      expect(mockgetAllTickets).toHaveBeenCalled();
      expect(result).toEqual(allTickets);
    });
  });
  
  describe('getRecentlyClosedTickets', () => {
    it('should get recently closed tickets', async () => {
      const closedTickets = [
        {
          _id: 'ticket123',
          title: 'Ticket 1',
          description: 'Description 1',
          status: TicketStatus.COMPLETED,
          creatorId: 'user123',
        },
        {
          _id: 'ticket456',
          title: 'Ticket 2',
          description: 'Description 2',
          status: TicketStatus.COMPLETED,
          creatorId: 'user456',
        },
      ];
  
      mockGwtRecentlyClosedTickets.mockResolvedValue(closedTickets);
  
      const result = await ticketService.getRecentlyClosedTickets();
  
      expect(mockGwtRecentlyClosedTickets).toHaveBeenCalled();
      expect(result).toEqual(closedTickets);
    });
  });
  
  describe('getTicket', () => {
    it('should get a specific ticket', async () => {
      const ticketId = 'ticket123';
      const ticket = {
        _id: ticketId,
        title: 'Test Ticket',
        description: 'Test description',
        status: TicketStatus.CREATED,
        creatorId: 'user123',
      };
  
      mockfindTicketById.mockResolvedValue(ticket);
  
      const result = await ticketService.getTicket(ticketId);
  
      expect(mockfindTicketById).toHaveBeenCalledWith(ticketId);
      expect(result).toEqual(ticket);
    });
  
    it('should throw ResourceNotFoundError if ticket not found', async () => {
      const ticketId = 'nonexistent';
  
      mockfindTicketById.mockResolvedValue(null);
  
      try {
        await ticketService.getTicket(ticketId);
      } catch (error) {
        expect(error).toBeInstanceOf(ResourceNotFoundError);
      }
    });
  });
  
  describe('processTicket', () => {   
    it('should process a ticket successfully', async () => {
      const userId = 'user123';
      const ticketId = 'ticket123';
      const ticket = {
        _id: ticketId,
        title: 'Test Ticket',
        description: 'Test description',
        status: TicketStatus.CREATED,
        creatorId: 'user123',
      };
  
      mockfindTicketById.mockResolvedValue(ticket);
  
      const result = await ticketService.processTicket(userId, ticketId);
  
      expect(mockfindTicketById).toHaveBeenCalledWith(ticketId);
      expect(mockProcessTicket).toHaveBeenCalledWith(userId, ticket);
      expect(result).toEqual({
        successful: true,
        message: 'Processing ticket',
      });
    });
  
    it('should throw BadRequest if ticket status is not CREATED', async () => {
      const userId = 'user123';
      const ticketId = 'ticket123';
      const ticket = {
        _id: ticketId,
        title: 'Test Ticket',
        description: 'Test description',
        status: TicketStatus.PROCESSING,
        creatorId: 'user123',
      };
  
      mockfindTicketById.mockResolvedValue(ticket);
  
      try {
        await ticketService.processTicket(userId, ticketId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequest);
      }
    });
  
    it('should throw ResourceNotFoundError if ticket not found', async () => {
      const userId = 'user123';
      const ticketId = 'nonexistent';

      mockfindTicketById.mockResolvedValue(null);

      try {
        await ticketService.processTicket(userId, ticketId);
      } catch (error) {
        expect(error ).toBeInstanceOf(ResourceNotFoundError);
      }
    });
  });

  describe('closeTicket', () => {
    it('should close a ticket successfully', async () => {
      const userId = 'user123';
      const ticketId = 'ticket123';
      const ticket = {
        _id: ticketId,
        title: 'Test Ticket',
        description: 'Test description',
        status: TicketStatus.PROCESSING,
        creatorId: 'user123',
      };

      mockfindTicketById.mockResolvedValue(ticket);

      const result = await ticketService.closeTicket(userId, ticketId);

      expect(mockfindTicketById).toHaveBeenCalledWith(ticketId);
      expect(mockCloseTicket).toHaveBeenCalledWith(userId, ticket);
      expect(result).toEqual({
        successful: true,
        message: 'Closed ticket',
      });
    });

    it('should throw BadRequest if ticket status is not PROCESSING', async () => {
      const userId = 'user123';
      const ticketId = 'ticket123';
      const ticket = {
        _id: ticketId,
        title: 'Test Ticket',
        description: 'Test description',
        status: TicketStatus.CREATED,
        creatorId: 'user123',
      };

      mockfindTicketById.mockResolvedValue(ticket);

      try {
        await ticketService.closeTicket(userId, ticketId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequest);
      }
    });

    it('should throw ResourceNotFoundError if ticket not found', async () => {
      const userId = 'user123';
      const ticketId = 'nonexistent';

      mockfindTicketById.mockResolvedValue(null);

      try {
        await ticketService.closeTicket(userId, ticketId);
      } catch (error) {
        expect(error).toBeInstanceOf(ResourceNotFoundError);
      }
    });
  
       
  
  });




});
