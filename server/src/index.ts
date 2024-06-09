import app from './app';
import { connectDB } from './config/database';
import logger from './utils/logger';

const PORT = process.env.PORT || 5000;

async function startServer() {
	try {
		await connectDB();

		app.listen(PORT, () => {
			logger.info(`Server is running on http://localhost:${PORT}`);
		});
	} catch (error) {
		logger.error(`Starting server failed: ${error}`);
		process.exit(1);
	}
}

startServer();
