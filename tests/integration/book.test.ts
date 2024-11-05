import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import app from '../../src/app';
import Book from '../../src/models/Book';

describe('Book API Integration Tests', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Book.deleteMany({});
  });

  const mockBook = {
    title: 'Test Book',
    author: 'Test Author',
    year: 2023,
    genre: 'Test Genre',
    isbn: '1234567890',
  };

  describe('POST /api/books', () => {
    it('should create a new book', async () => {
      const response = await request(app).post('/api/books').send(mockBook);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', mockBook.title);
      expect(response.body).toHaveProperty('author', mockBook.author);
    });

    it('should fail to create book with missing required fields', async () => {
      const response = await request(app).post('/api/books').send({ title: 'Test Book' });

      expect(response.status).toBe(500);
    });
  });

  describe('GET /api/books', () => {
    it('should get all books', async () => {
      await Book.create(mockBook);

      const response = await request(app).get('/api/books');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBe(1);
    });
  });

  describe('GET /api/books/:id', () => {
    it('should get book by id', async () => {
      const book = await Book.create(mockBook);

      const response = await request(app).get(`/api/books/${book._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title', mockBook.title);
    });

    it('should return 404 for non-existent book', async () => {
      const response = await request(app).get(`/api/books/${new mongoose.Types.ObjectId()}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/books/:id', () => {
    it('should update book', async () => {
      const book = await Book.create(mockBook);
      const updatedData = { title: 'Updated Title' };

      const response = await request(app).put(`/api/books/${book._id}`).send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title', updatedData.title);
    });
  });

  describe('DELETE /api/books/:id', () => {
    it('should delete book', async () => {
      const book = await Book.create(mockBook);

      const response = await request(app).delete(`/api/books/${book._id}`);

      expect(response.status).toBe(200);

      const deletedBook = await Book.findById(book._id);
      expect(deletedBook).toBeNull();
    });
  });
});
