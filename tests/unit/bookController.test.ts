import { Request, Response } from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../../src/controllers/bookController';
import Book from '../../src/models/Book';

// Mock the Book model
jest.mock('../../src/models/Book');

describe('Book Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    responseObject = {
      statusCode: 0,
      json: jest.fn(),
    };
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnValue({ json: responseObject.json }),
      json: responseObject.json,
    };
  });

  describe('createBook', () => {
    const mockBook = {
      title: 'Test Book',
      author: 'Test Author',
      year: 2023,
      genre: 'Test Genre',
      isbn: '1234567890',
    };

    it('should create a book successfully', async () => {
      mockRequest.body = mockBook;
      (Book.create as jest.Mock).mockResolvedValueOnce(mockBook);

      await createBook(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(responseObject.json).toHaveBeenCalledWith(mockBook);
    });

    it('should handle errors when creating a book', async () => {
      mockRequest.body = mockBook;
      (Book.create as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

      await createBook(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObject.json).toHaveBeenCalledWith({ error: 'Error creating book' });
    });
  });

  describe('getAllBooks', () => {
    const mockBooks = [
      { title: 'Book 1', author: 'Author 1' },
      { title: 'Book 2', author: 'Author 2' },
    ];

    it('should get all books successfully', async () => {
      (Book.find as jest.Mock).mockResolvedValueOnce(mockBooks);

      await getAllBooks(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith(mockBooks);
    });

    it('should handle errors when getting all books', async () => {
      (Book.find as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

      await getAllBooks(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObject.json).toHaveBeenCalledWith({ error: 'Error fetching books' });
    });
  });

  describe('getBookById', () => {
    const mockBook = { id: '1', title: 'Test Book' };

    it('should get a book by id successfully', async () => {
      mockRequest.params = { id: '1' };
      (Book.findById as jest.Mock).mockResolvedValueOnce(mockBook);

      await getBookById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith(mockBook);
    });

    it('should return 404 when book is not found', async () => {
      mockRequest.params = { id: '1' };
      (Book.findById as jest.Mock).mockResolvedValueOnce(null);

      await getBookById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObject.json).toHaveBeenCalledWith({ error: 'Book not found' });
    });
  });

  describe('updateBook', () => {
    const mockBook = { id: '1', title: 'Updated Book' };

    it('should update a book successfully', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = { title: 'Updated Book' };
      (Book.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(mockBook);

      await updateBook(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith(mockBook);
    });

    it('should return 404 when book to update is not found', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = { title: 'Updated Book' };
      (Book.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);

      await updateBook(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObject.json).toHaveBeenCalledWith({ error: 'Book not found' });
    });
  });

  describe('deleteBook', () => {
    const mockBook = { id: '1', title: 'Test Book' };

    it('should delete a book successfully', async () => {
      mockRequest.params = { id: '1' };
      (Book.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(mockBook);

      await deleteBook(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith({ message: 'Book deleted successfully' });
    });

    it('should return 404 when book to delete is not found', async () => {
      mockRequest.params = { id: '1' };
      (Book.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);

      await deleteBook(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObject.json).toHaveBeenCalledWith({ error: 'Book not found' });
    });
  });
});
