import dotenv from 'dotenv';
import connectDB from '../src/config/database';
import Book from '../src/models/Book';
import logger from '../src/utils/logger';

dotenv.config();

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
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    year: 1960,
    genre: 'Classic',
    isbn: '978-0446310789',
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    year: 1937,
    genre: 'Fantasy',
    isbn: '978-0547928227',
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    year: 1813,
    genre: 'Romance',
    isbn: '978-0141439518',
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing books
    await Book.deleteMany({});
    logger.info('Cleared existing books from database');

    // Insert sample books
    await Book.insertMany(sampleBooks);
    logger.info('Successfully seeded database with sample books');

    process.exit(0);
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
