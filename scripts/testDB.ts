import dotenv from 'dotenv';
import connectDB from '../src/config/database';
import Book from '../src/models/Book';

dotenv.config();

const testDBConnection = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('Database connection test started...');

    // Test creating a book
    const testBook = await Book.create({
      title: 'Test Book',
      author: 'Test Author',
      year: 2023,
      genre: 'Test Genre',
      isbn: 'TEST-ISBN-' + Date.now(),
    });
    console.log('Test book created:', testBook);

    // Test finding the book
    const foundBook = await Book.findById(testBook._id);
    console.log('Test book found:', foundBook);

    // Clean up - delete test book
    await Book.findByIdAndDelete(testBook._id);
    console.log('Test book deleted');

    console.log('Database connection and CRUD operations test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Database test failed:', error);
    process.exit(1);
  }
};

testDBConnection();
