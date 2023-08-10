import { body } from 'express-validator';



export const createTicketValidator = [
  body('title', 'title of ticket')
    .isLength({
      min: 2,
      max: 100,
    })
    .exists()
    .trim()
    .escape(),
  body('description', 'Description of ticket')
    .isLength({
      min: 2,
      max: 2000,
    })
    .exists()
    .trim()
    .escape(),

  
];


export const commentValidator = [
  body('content', 'Content of comment')
    .isLength({
      min: 2,
      max: 2000,
    })
    .exists()
    .trim()
    .escape(),
  body('ticketId', 'Id of ticket')
    .isLength({
      min: 2,
      max: 100,
    })
    .exists()
    .trim()
    .escape(),
    
];