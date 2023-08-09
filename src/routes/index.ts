import express from 'express';

import { unknownRouteError } from '../utils/errors/ErrorHandlers';
import authRoutes from './auth';


const router: express.Router = express.Router();

router.use('/health', (req, res) => {
  res.send({status: 'OK'});
});

router.use('/auth', authRoutes);



router.use(unknownRouteError);

export default router;
