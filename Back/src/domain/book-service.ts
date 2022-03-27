import { getRepository } from 'typeorm';

import { Book } from '../utils';

export const getBookByNameOrId = async (
    book_id?: string,
    title?: string
): Promise<Book | Book[] | undefined> => {
    const bookRepository = getRepository(Book);
    if (book_id) {
        return await bookRepository.findOne(book_id);
    }
    if (title) {
        return await bookRepository.find({ where: { title } });
    }
};

export const getAllBook = async (): Promise<Book[] | undefined> => {
    const bookRepository = getRepository(Book);
    return await bookRepository.find({
        select: [
            'book_id',
            'author_id',
            'title',
            'publisher_id',
            'place_publication',
            'published_dt',
            'category_id',
            'isbn',
            'status',
        ],
    });
};

export const addBook = async (
    author_id: number,
    publisher_id: number,
    title: string,
    place_publication: string,
    category_id: number,
    published_dt: number,
    isbn: number,
    status: boolean
): Promise<Book | void> => {
    const bookRepository = getRepository(Book);
    const book = new Book();
    book.author_id = author_id;
    book.publisher_id = publisher_id;
    book.title = title;
    book.place_publication = place_publication;
    book.category_id = category_id;
    book.published_dt = published_dt;
    book.isbn = isbn;
    book.status = status;

    return await bookRepository.save(book).catch((err) => console.log(err));
};

export const updateBook = async (
    book_id: number,
    author_id?: number,
    publisher_id?: number,
    title?: string,
    place_publication?: string,
    category_id?: number,
    published_dt?: number,
    isbn?: number
): Promise<Book | void> => {
    const bookRepository = getRepository(Book);
    const bookUpdate = await bookRepository.findOne(book_id);
    if (bookUpdate) {
        if (author_id) {
            bookUpdate.author_id = author_id;
        }
        if (publisher_id) {
            bookUpdate.publisher_id = publisher_id;
        }
        if (title) {
            bookUpdate.title = title;
        }
        if (place_publication) {
            bookUpdate.place_publication = place_publication;
        }
        if (category_id) {
            bookUpdate.category_id = category_id;
        }
        if (published_dt) {
            bookUpdate.published_dt = published_dt;
        }
        if (isbn) {
            bookUpdate.isbn = isbn;
        }

        return bookRepository.save(bookUpdate).catch((err) => console.log(err));
    }
};

export const deleteBook = async (book_id: number): Promise<void> => {
    const subscriptionRepository = getRepository(Book);
    await subscriptionRepository.delete(book_id);
};
