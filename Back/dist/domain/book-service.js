"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.addBook = exports.getAllBook = exports.getBookByNameOrId = void 0;
const typeorm_1 = require("typeorm");
const utils_1 = require("../utils");
const getBookByNameOrId = async (book_id, title) => {
    const bookRepository = (0, typeorm_1.getRepository)(utils_1.Book);
    if (book_id) {
        return await bookRepository.findOne(book_id);
    }
    if (title) {
        return await bookRepository.find({ where: { title } });
    }
};
exports.getBookByNameOrId = getBookByNameOrId;
const getAllBook = async () => {
    const bookRepository = (0, typeorm_1.getRepository)(utils_1.Book);
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
exports.getAllBook = getAllBook;
const addBook = async (author_id, publisher_id, title, place_publication, category_id, published_dt, isbn, status) => {
    const bookRepository = (0, typeorm_1.getRepository)(utils_1.Book);
    const book = new utils_1.Book();
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
exports.addBook = addBook;
const updateBook = async (book_id, author_id, publisher_id, title, place_publication, category_id, published_dt, isbn) => {
    const bookRepository = (0, typeorm_1.getRepository)(utils_1.Book);
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
exports.updateBook = updateBook;
const deleteBook = async (book_id) => {
    const subscriptionRepository = (0, typeorm_1.getRepository)(utils_1.Book);
    await subscriptionRepository.delete(book_id);
};
exports.deleteBook = deleteBook;
