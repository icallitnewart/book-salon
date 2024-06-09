import mongoose, { ConnectOptions } from 'mongoose';
import logger from '../utils/logger';

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI!, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		} as ConnectOptions);

		logger.info('Connected to MongoDB!🎉');
	} catch (error) {
		if (error instanceof Error) {
			logger.error(`Connecting to MongoDB failed: ${error.message}`);
			process.exit(1);
		}
	}
};

export { connectDB };
