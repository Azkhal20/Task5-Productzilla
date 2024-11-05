import { Request, Response } from 'express';
import Book from '../models/Book';
import { IBook } from '../types/book.types';

export const createBook = async (req: Request, res: Response) => {
  try {
    const bookData: IBook = req.body;
    const book = await Book.create(bookData);
    return res.status(201).json(book);
  } catch (error) {
    return res.status(500).json({ error: 'Error creating book' });
  }
};

export const getAllBooks = async (_req: Request, res: Response) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching books' });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching book' });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ error: 'Error updating book' });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    return res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting book' });
  }
};