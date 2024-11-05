import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Management API',
      version: '1.0.0',
      description: 'A REST API for managing books using Express.js and MongoDB',
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Book: {
          type: 'object',
          required: ['title', 'author', 'year', 'genre', 'isbn'],
          properties: {
            _id: {
              type: 'string',
              description: 'The auto-generated id of the book',
            },
            title: {
              type: 'string',
              description: 'The title of the book',
            },
            author: {
              type: 'string',
              description: 'The author of the book',
            },
            year: {
              type: 'number',
              description: 'The publication year of the book',
            },
            genre: {
              type: 'string',
              description: 'The genre of the book',
            },
            isbn: {
              type: 'string',
              description: 'The ISBN of the book',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The timestamp when the book was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The timestamp when the book was last updated',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error',
            },
            message: {
              type: 'string',
              example: 'Error message details',
            },
          },
        },
      },
      responses: {
        BadRequest: {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        NotFound: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes
};

export const specs = swaggerJsdoc(options);
