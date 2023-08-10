import express from 'express';
import { Validator } from '../middlewares/Validator';
import { createTicketValidator, commentValidator } from '../validators/Tickets';
import { TicketController } from '../controllers/TicketController';
import { Security } from '../middlewares/Security';
import { UserType } from '../interfaces/UserType';




const router: express.Router = express.Router();

router.post(
  '/',
  Security.isAuthUser([UserType.USER]),
  Validator.validate(createTicketValidator),
  TicketController.createTicket
);

router.get(
  '/',
  Security.isAuthUser([UserType.USER]),
  TicketController.getUserTickets
);

router.post(
  '/comment',
  Security.isAuthUser([UserType.USER, UserType.ADMIN, UserType.AGENT]),
  Validator.validate(commentValidator),
  TicketController.comment
);



export default router;