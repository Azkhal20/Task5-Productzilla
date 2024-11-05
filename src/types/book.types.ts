export interface IBook {
  title: string;
  author: string;
  year: number;
  genre: string;
  isbn: string;
}

export interface IBookDocument extends IBook {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
