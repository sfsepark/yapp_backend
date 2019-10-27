import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from './swagger';

import './passport';

import { authenticateJwt } from './middlewares';
import routes from './routes';
import globalRouter from './router/globalRouter';
import projectRouter from './router/projectRouter';
import mypageRouter from './router/mypageRouter';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(authenticateJwt);

app.use(routes.projects, projectRouter);
app.use(routes.mypage, mypageRouter);
app.use(routes.home, globalRouter);

const swaggerOption = {
  swaggerDefinition,
  apis: ['./src/router/**/*.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOption);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
