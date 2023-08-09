import express from 'express';
import { Validator } from '../middlewares/Validator';
import { signupValidator, loginValidator } from '../validators/Users';
import { AuthController } from '../controllers/Authcontroller';



const router: express.Router = express.Router();

router.post(
  '/login',
  Validator.validate(loginValidator),
  AuthController.login
);

router.post(
  '/signup',
  Validator.validate(signupValidator),
  AuthController.signup
);



export default router;