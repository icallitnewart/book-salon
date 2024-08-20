import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Book Salon API',
		version: '1.0.0',
		description: 'API documentation for the Book Salon API',
	},
	servers: [
		{
			url: `http://localhost:5000/api`,
			description: 'Development server',
		},
	],
	components: {
		securitySchemes: {
			cookieAuth: {
				type: 'apiKey',
				in: 'cookie',
				name: 'token',
			},
		},
	},
};

const options = {
	swaggerDefinition,
	apis: ['./src/domains/**/*.ts'],
};

export default swaggerJSDoc(options);
