import { FastifyInstance, FastifyReply } from 'fastify';

import {
    addBook,
    deleteBook,
    getAllBook,
    getBookByNameOrId,
    updateBook,
} from '../domain';
import * as bookSchema from '../schemas/json/book.json';
import { Book } from '../schemas/types/book';

interface IBookQuery {
    book_id?: string;
    title?: string;
}
// eslint-disable-next-line @typescript-eslint/require-await
export async function bookRoute(fastify: FastifyInstance): Promise<void> {
    /**
     * @api {get} /books/ Get all books
     * @apiName Get
     * @apiGroup Books
     *
     * @apiSuccess (200) {Book[]} bookRepository all books
     */
    fastify.get('/all', async function (req, rep): Promise<FastifyReply> {
        return rep.code(200).send(await getAllBook());
    });

    /**
     * @api {get} /books/ Get a book
     * @apiName Get
     * @apiGroup Books
     *
     * @apiParam {String} book_id id of a book
     * @apiParam {String} title title of a book
     *
     * @apiSuccess {Book} res a book
     */
    fastify.get<{ Querystring: IBookQuery }>(
        '/',
        async function (req, rep): Promise<FastifyReply> {
            const { book_id, title } = req.query;
            const res = await getBookByNameOrId(book_id, title);
            return rep.code(200).send(res);
        }
    );

    /**
     * @api {post} /books/ Post a book
     * @apiName Post
     * @apiGroup Books
     *
     * @apiParam {String} token a JSON Web Token
     * @apiParam {Number} author_id id of a book
     * @apiParam {Number} publisher_id publisher id of a book
     * @apiParam {String} title title of a book
     * @apiParam {String} place_publication place of publication of a book
     * @apiParam {Number} category_id category id of a book
     * @apiParam {Number} published_dt publish date of a book
     * @apiParam {Number} isbn isbn of a book
     * @apiParam {Boolean} status status of a book
     *
     * @apiSuccess (201) {Book} book a book
     */
    fastify.post<{ Headers: { token: string }; Body: Book }>(
        '/',
        { schema: { body: bookSchema, response: { 201: bookSchema } } },
        async function (request, reply): Promise<FastifyReply> {
            const { token } = request.headers;

            const book = await addBook(
                request.body.author_id,
                request.body.publisher_id,
                request.body.title,
                request.body.place_publication,
                request.body.category_id,
                request.body.published_dt,
                request.body.isbn,
                request.body.status
            );
            return reply.code(201).send(book);
        }
    );

    /**
     * @api {put} /books/ Modify a book
     * @apiName Put
     * @apiGroup Books
     *
     * @apiParam {String} token a JSON Web Token
     * @apiParam {Number} author_id id of a book
     * @apiParam {Number} publisher_id publisher id of a book
     * @apiParam {String} title title of a book
     * @apiParam {String} place_publication place of publication of a book
     * @apiParam {Number} category_id category id of a book
     * @apiParam {Number} published_dt publish date of a book
     * @apiParam {Number} isbn isbn of a book
     * @apiParam {Boolean} status status of a book
     *
     * @apiSuccess {Book} bookInfo a book
     * @apiError 400 Author not modified
     * @apiError 400 Bad Request
     */
    fastify.put<{ Headers: { token: string }; Body: Book }>(
        '/',
        {
            schema: {
                body: bookSchema,
                response: { 200: bookSchema },
            },
        },
        async function (request, reply): Promise<FastifyReply> {
            const { token } = request.headers;

            if (request.body.book_id) {
                const bookInfo = await updateBook(
                    request.body.book_id,
                    request.body.author_id ? request.body.author_id : undefined,
                    request.body.publisher_id
                        ? request.body.publisher_id
                        : undefined,
                    request.body.title ? request.body.title : undefined,
                    request.body.place_publication
                        ? request.body.place_publication
                        : undefined,
                    request.body.category_id
                        ? request.body.category_id
                        : undefined,
                    request.body.published_dt
                        ? request.body.published_dt
                        : undefined,
                    request.body.isbn ? request.body.isbn : undefined
                );
                if (bookInfo) {
                    return reply.code(200).send(bookInfo);
                } else {
                    return reply
                        .code(400)
                        .send(new Error('Author not modified'));
                }
            }
            return reply.code(400).send('No Admin Right');
        }
    );

    /**
     * @api {delete} /books/ Delete a book
     * @apiName Delete
     * @apiGroup Books
     *
     * @apiParam {String} token a JSON Web Token
     * @apiParam {String} book_id id of a book
     *
     * @apiSuccess {String} Delete Success
     * @apiError 400 Wrong parameters
     */
    fastify.delete<{
        Headers: { token: string };
        Querystring: { book_id: string };
    }>('/', async function (request, reply): Promise<void | FastifyReply> {
        const bookId = parseInt(request.query.book_id);
        const { token } = request.headers;
        if (!isNaN(bookId)) {
            await deleteBook(bookId);
            return reply.code(200).send('Delete Success');
        }
        return reply.code(400).send(new Error('Wrong parameters'));
    });
}
