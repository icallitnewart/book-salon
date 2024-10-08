import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { errorMiddleware } from './middlewares';
import swaggerSpec from './config/swagger';

import userRouter from './domains/user/userRouter';
import bookRouter from './domains/book/bookRouter';
import reviewRouter from './domains/review/reviewRouter';
import commentRouter from './domains/comment/commentRouter';
import likeRouter from './domains/like/likeRouter';

const app = express();
const corsOptions = {
	origin: ['http://localhost:3000', 'https://book-salon.vercel.app'],
	credentials: true,
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/comments', commentRouter);
app.use('/api/likes', likeRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorMiddleware);

export default app;
