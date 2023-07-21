import { AppDataSource } from '../config/database/data-source';
import InternalException from '../exceptions/InternalException';

export const openConnection = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.error(error);
    throw new InternalException('Error initializing database connection');
  }
};

export const closeConnection = async (): Promise<void> => {
  try {
    await AppDataSource.destroy();
  } catch (error) {
    console.error(error);
    throw new InternalException('Error close database connection');
  }
};
