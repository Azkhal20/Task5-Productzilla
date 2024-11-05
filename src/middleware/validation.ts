import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  year: z.number().min(1000).max(new Date().getFullYear()),
  genre: z.string().min(1, 'Genre is required'),
  isbn: z.string().regex(/^(?:\d{10}|\d{13}|[0-9X]{10}|[0-9X]{13})$/, 'Invalid ISBN format'),
});

export const validateBookInput = (req: Request, res: Response, next: NextFunction) => {
  try {
    bookSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors,
      });
    }
    return res.status(400).json({ error: 'Invalid input' });
  }
};
