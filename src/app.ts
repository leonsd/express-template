import express, { Application } from 'express';
import cors from 'cors';

import { openConnection } from './middlewares/databaseConnection';
import { router } from './routes';

export class App {
  public express: Application;

  constructor() {
    this.express = express();
  }

  boot = () => {
    openConnection().then();

    this.middlewares();
    this.routes();

    return this.express;
  };

  middlewares = () => {
    this.express.use(express.json());
    this.express.use(cors());
  };

  routes() {
    this.express.use(router);
  }
}
