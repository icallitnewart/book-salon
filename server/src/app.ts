import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';

import { errorMiddleware } from './middlewares';
import swaggerSpec from './config/swagger';

import sampleRouter from './domains/sample/sampleRouter';
import userRouter from './domains/user/userRouter';

const app = express();
const corsOptions = {
	origin: ['http://localhost:3000'],
	optionsSuccessStatus: 200,
};

config();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use('/api/samples', sampleRouter);
app.use('/api/users', userRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorMiddleware);

export default app;
