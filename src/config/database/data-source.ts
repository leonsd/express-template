import 'reflect-metadata';
import { entities } from '../../models';
import { DataSource, DataSourceOptions } from 'typeorm';

const options = {
  dev: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    migrationsRun: false,
    entities,
    migrations: ['./migrations/*.ts'],
  },
  qa: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    migrationsRun: false,
    entities: ['build/models/*.js'],
    migrations: ['build/config/database/migrations/*.js'],
  },
  prod: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    migrationsRun: false,
    entities: ['build/models/*.js'],
    migrations: ['build/config/database/migrations/*.js'],
  },
};

const environment = process.env.NODE_ENV as keyof typeof options;
const option = options[environment] as DataSourceOptions;

export const AppDataSource = new DataSource(option);
