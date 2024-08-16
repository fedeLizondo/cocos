import { DataSource } from 'typeorm';
import { Instrument } from './entity/Instrument';
import { User } from './entity/User';
import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { Order } from './entity/Order';
import { MarketData } from './entity/MarketData';

dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
} = process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT ?? '5432'),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [Instrument, Order, User, MarketData],
  synchronize: false, 
  migrationsRun: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Conexión a la base de datos establecida');
  })
  .catch((error) => console.log('Error al conectar a la base de datos', error));
