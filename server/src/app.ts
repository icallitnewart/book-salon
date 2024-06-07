import express from 'express';
import cors from 'cors';

const app = express();

const corsOptions = {
	origin: ['http://localhost:3000'],
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello, TypeScript with Express!');
});

export default app;
