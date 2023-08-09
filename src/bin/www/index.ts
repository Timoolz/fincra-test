import dotenv from 'dotenv';
dotenv.config();
import app from '../../app';
import { Logger } from '../../utils/Logger';

import mongoose from 'mongoose';

import { seedBaseData } from '../../seed-config/seedConfig';


(async () => {
  mongoose.connect(`${process.env.MONGO_URI}`, { autoCreate: true }).then(async () => {
    Logger.Info('Connected! mongooose!');

    seedBaseData().then(() => {

      // Start express server
      app.listen(process.env.PORT || 3000, () => {
        const port = app.get('port');

        Logger.Info(`Fincra Support Service Started at http://localhost:${port}`);
        Logger.Info('Press CTRL+C to stop\n');
      });

    }).catch(error => {
      Logger.Error('Db seed failed : ', error);
    });
  }).catch(error => Logger.Error('MongoDb connection failed : ' + error));
})();
