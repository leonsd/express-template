import express, { Application } from 'express';
import cors from 'cors';

import { openConnection } from './middlewares/databaseConnection';
import { errorHandler } from './middlewares/errorHandler';
import { router } from './routes';

export class App {
  public app: Application;

  constructor() {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  listen = () => {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      const { log } = console;
      log('App started in PORT ', PORT);
    });
  };

  connectToTheDatabase = () => {
    openConnection().then();
  };

  initializeMiddlewares = () => {
    this.app.use(express.json());
    this.app.use(cors());
  };

  initializeRoutes() {
    this.app.use(router);
  }

  initializeErrorHandling = () => {
    this.app.use(errorHandler);
  };
}
