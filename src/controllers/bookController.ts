import { Request, Response, NextFunction } from 'express';
import Book from '../models/Book';
import { AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.create(req.body);
    logger.info('Book created', { bookId: book._id });
    return res.status(201).json(book);
  } catch (error) {
    logger.error('Error creating book', { error });
    next(new AppError(500, 'Error creating book'));
  }
};

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { genre, year, author } = req.query;
    const query: any = {};

    if (genre) query.genre = genre;
    if (year) query.year = year;
    if (author) query.author = { $regex: author, $options: 'i' };

    const books = await Book.find(query);
    return res.status(200).json(books);
  } catch (error) {
    logger.error('Error fetching books', { error });
    next(new AppError(500, 'Error fetching books'));
  }
};

export const searchBooks = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    if (!q) {
      throw new AppError(400, 'Search query is required');
    }

    const books = await Book.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { author: { $regex: q, $options: 'i' } },
        { genre: { $regex: q, $options: 'i' } },
        { isbn: { $regex: q, $options: 'i' } },
      ],
    });

    return res.status(200).json(books);
  } catch (error) {
    logger.error('Error searching books', { error });
    throw new AppError(500, 'Error searching books');
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      throw new AppError(404, 'Book not found');
    }
    return res.status(200).json(book);
  } catch (error) {
    logger.error('Error fetching book', { error, bookId: req.params.id });
    throw new AppError(500, 'Error fetching book');
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      throw new AppError(404, 'Book not found');
    }
    logger.info('Book updated', { bookId: book._id });
    return res.status(200).json(book);
  } catch (error) {
    logger.error('Error updating book', { error, bookId: req.params.id });
    throw new AppError(500, 'Error updating book');
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      throw new AppError(404, 'Book not found');
    }
    logger.info('Book deleted', { bookId: req.params.id });
    return res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    logger.error('Error deleting book', { error, bookId: req.params.id });
    throw new AppError(500, 'Error deleting book');
  }
};
