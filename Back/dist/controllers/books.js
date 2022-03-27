"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoute = void 0;
const domain_1 = require("../domain");
const bookSchema = __importStar(require("../schemas/json/book.json"));
// eslint-disable-next-line @typescript-eslint/require-await
async function bookRoute(fastify) {
    /**
     * @api {get} /books/ Get all books
     * @apiName Get
     * @apiGroup Books
     *
     * @apiSuccess (200) {Book[]} bookRepository all books
     */
    fastify.get('/all', async function (req, rep) {
        return rep.code(200).send(await (0, domain_1.getAllBook)());
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
    fastify.get('/', async function (req, rep) {
        const { book_id, title } = req.query;
        const res = await (0, domain_1.getBookByNameOrId)(book_id, title);
        return rep.code(200).send(res);
    });
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
    fastify.post('/', { schema: { body: bookSchema, response: { 201: bookSchema } } }, async function (request, reply) {
        const { token } = request.headers;
        const book = await (0, domain_1.addBook)(request.body.author_id, request.body.publisher_id, request.body.title, request.body.place_publication, request.body.category_id, request.body.published_dt, request.body.isbn, request.body.status);
        return reply.code(201).send(book);
    });
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
    fastify.put('/', {
        schema: {
            body: bookSchema,
            response: { 200: bookSchema },
        },
    }, async function (request, reply) {
        const { token } = request.headers;
        if (request.body.book_id) {
            const bookInfo = await (0, domain_1.updateBook)(request.body.book_id, request.body.author_id ? request.body.author_id : undefined, request.body.publisher_id
                ? request.body.publisher_id
                : undefined, request.body.title ? request.body.title : undefined, request.body.place_publication
                ? request.body.place_publication
                : undefined, request.body.category_id
                ? request.body.category_id
                : undefined, request.body.published_dt
                ? request.body.published_dt
                : undefined, request.body.isbn ? request.body.isbn : undefined);
            if (bookInfo) {
                return reply.code(200).send(bookInfo);
            }
            else {
                return reply
                    .code(400)
                    .send(new Error('Author not modified'));
            }
        }
        return reply.code(400).send('No Admin Right');
    });
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
    fastify.delete('/', async function (request, reply) {
        const bookId = parseInt(request.query.book_id);
        const { token } = request.headers;
        if (!isNaN(bookId)) {
            await (0, domain_1.deleteBook)(bookId);
            return reply.code(200).send('Delete Success');
        }
        return reply.code(400).send(new Error('Wrong parameters'));
    });
}
exports.bookRoute = bookRoute;
