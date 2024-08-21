import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import 'reflect-metadata';
import { AppDataSource } from './clients/db';

import * as middlewares from './middlewares';
import instrumentController from './controllers/InstrumentsController';
import portafolioController from './controllers/PortafolioController';
import orderController from './controllers/OrderController';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/instruments', instrumentController);
app.use('/portafolio', portafolioController);
app.use('/orders', orderController);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
