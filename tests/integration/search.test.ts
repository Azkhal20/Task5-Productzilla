import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import app from '../../src/app';
import Book from '../../src/models/Book';

describe('Search API Integration Tests', () => {
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

  const sampleBooks = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      year: 1925,
      genre: 'Classic',
      isbn: '978-0743273565',
    },
    {
      title: '1984',
      author: 'George Orwell',
      year: 1949,
      genre: 'Science Fiction',
      isbn: '978-0451524935',
    },
    {
      title: 'Brave New World',
      author: 'Aldous Huxley',
      year: 1932,
      genre: 'Science Fiction',
      isbn: '978-0060850524',
    },
  ];

  describe('GET /api/books/search', () => {
    beforeEach(async () => {
      await Book.insertMany(sampleBooks);
    });

    it('should search books by title', async () => {
      const response = await request(app).get('/api/books/search').query({ q: 'brave' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].title).toBe('Brave New World');
    });

    it('should search books by author', async () => {
      const response = await request(app).get('/api/books/search').query({ q: 'Orwell' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].author).toBe('George Orwell');
    });

    it('should search books by genre', async () => {
      const response = await request(app).get('/api/books/search').query({ q: 'Science Fiction' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });

    it('should return empty array when no matches found', async () => {
      const response = await request(app).get('/api/books/search').query({ q: 'nonexistent' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(0);
    });

    it('should return 400 when no search query provided', async () => {
      const response = await request(app).get('/api/books/search');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});
