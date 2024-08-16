import { Portafolio } from './Models/portafolio';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import 'reflect-metadata';
import { AppDataSource } from './clients/db';

import * as middlewares from './middlewares';
import api from './api';
import instrumentController from './controllers/InstrumentsController';
import portafolioController from './controllers/PortafolioController';
import MessageResponse from './interfaces/MessageResponse';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);
app.use('/instruments', instrumentController);
app.use('/portafolio', portafolioController)

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
