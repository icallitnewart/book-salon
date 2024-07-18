import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { errorMiddleware } from './middlewares';
import swaggerSpec from './config/swagger';

import sampleRouter from './domains/sample/sampleRouter';
import userRouter from './domains/user/userRouter';
import bookRouter from './domains/book/bookRouter';
import reviewRouter from './domains/review/reviewRouter';

const app = express();
const corsOptions = {
	origin: ['http://localhost:3000'],
	credentials: true,
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use('/api/samples', sampleRouter);
app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);
app.use('/api/reviews', reviewRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorMiddleware);

export default app;
