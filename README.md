# Book Management API

![Main Branch CI/CD](https://github.com/[your-username]/book-management-api/workflows/Main%20Branch%20CI%2FCD/badge.svg)
![Feature Branch CI](https://github.com/[your-username]/book-management-api/workflows/Feature%20Branch%20CI/badge.svg)

A RESTful API for managing books built with Express.js, TypeScript, and MongoDB.

## Features

- CRUD operations for books
- TypeScript implementation
- MongoDB database
- Unit and Integration testing with Jest
- Docker containerization
- CI/CD with GitHub Actions

## Prerequisites

- Node.js 16+
- MongoDB
- Docker (optional)
- Docker Compose (optional)

## Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/[your-username]/book-management-api.git
   cd book-management-api
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a .env file in the root directory:
   \`\`\`
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/book-management
   \`\`\`

## Running the Application

### Development Mode

\`\`\`bash
npm run dev
\`\`\`

### Production Mode

\`\`\`bash
npm run build
npm start
\`\`\`

### Using Docker

\`\`\`bash
docker-compose up
\`\`\`

## Testing

Run all tests:
\`\`\`bash
npm test
\`\`\`

Run tests with coverage:
\`\`\`bash
npm run test:coverage
\`\`\`

## API Endpoints

- GET /api/books - Get all books
- GET /api/books/:id - Get a specific book
- POST /api/books - Create a new book
- PUT /api/books/:id - Update a book
- DELETE /api/books/:id - Delete a book

## CI/CD Pipeline

The project uses GitHub Actions for CI/CD:

- Feature branches: Run tests and build
- Main branch: Run tests, build, and deploy Docker image to Docker Hub

## Docker

Build the image:
\`\`\`bash
docker build -t book-management-api .
\`\`\`

Run the container:
\`\`\`bash
docker run -p 3000:3000 book-management-api
\`\`\`

## License

This project is licensed under the MIT License.
