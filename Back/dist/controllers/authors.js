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
exports.authorsRoute = void 0;
const domain_1 = require("../domain");
const authorSchema = __importStar(require("../schemas/json/author.json"));
// eslint-disable-next-line @typescript-eslint/require-await
async function authorsRoute(fastify) {
    /**
     * @api {get} /authors/ Get an author
     * @apiName Get
     * @apiGroup Author
     *
     * @apiParam {String} researchWord string that refers to an Author
     * @apiParam {Number} id id that refers to an Author
     *
     * @apiSuccess {Object[]} resultWithId array of information about the Author
     * @apiError 400 Wrong query
     * @apiError 400 Author not existing
     */
    fastify.get('/', async function (request, reply) {
        if (request.query.id) {
            const authorId = parseInt(request.query.id);
            if (!isNaN(authorId)) {
                const resultWithId = await (0, domain_1.getAuthorId)(authorId);
                return reply.code(200).send(resultWithId);
            }
            else {
                return reply
                    .code(400)
                    .send(new Error('Author not existing'));
            }
        }
        else if (request.query.researchWord) {
            const result = await (0, domain_1.getAuthorByReserch)(request.query.researchWord);
            return reply.code(200).send(result);
        }
        else {
            return reply.code(400).send(new Error('Wrong query'));
        }
    });
    fastify.get('/all', async function (req, rep) {
        return rep.code(200).send(await (0, domain_1.getAllAuthor)());
    });
    /**
     * @api {post} /authors/ Post an Author
     * @apiName Post
     * @apiGroup Author
     *
     * @apiParam {String} author_name name of an Author
     * @apiParam {Number} born date of birth of an Author
     * @apiParam {Number} died date of death of an Author
     *
     * @apiSuccess (201) {Author} authorInfo an Author
     */
    fastify.post('/', { schema: { body: authorSchema, response: { 200: authorSchema } } }, async function (request, reply) {
        const authorInfo = await (0, domain_1.addAuthor)(request.body.author_name, request.body.born, request.body.died ? request.body.died : undefined);
        return reply.code(201).send(authorInfo);
    });
    /**
     * @api {put} /authors/ Modify an Author
     * @apiName Put
     * @apiGroup Author
     *
     * @apiParam {Number} author_id id of an Author
     * @apiParam {String} author_name name of an Author
     * @apiParam {Number} born date of birth of an Author
     * @apiParam {Number} died date of death of an Author
     *
     * @apiSuccess {Author} authorInfo an Author
     * @apiError 400 Author not modified
     * @apiError 400 Bad Request
     */
    fastify.put('/', {
        schema: {
            body: authorSchema,
            response: { 200: authorSchema },
        },
    }, async function (request, reply) {
        if (request.body.author_id) {
            const authorInfo = await (0, domain_1.updateAuthor)(request.body.author_id, request.body.author_name, request.body.born, request.body.died);
            if (authorInfo) {
                return reply.code(200).send(authorInfo);
            }
            else {
                return reply
                    .code(400)
                    .send(new Error('Author not modified'));
            }
        }
        else {
            return reply.code(400).send(new Error('Bad Request'));
        }
    });
    /**
     * @api {delete} /authors/ Delete an Author
     * @apiName Delete
     * @apiGroup Author
     *
     * @apiParam {String} researchWord string that refers to an Author
     * @apiParam {Number} id id that refers to an Author
     *
     * @apiSuccess {String} message Delete Success
     * @apiError 400 Wrong parameters
     * @apiError 400 Author not existing
     */
    fastify.delete('/', async function (request, reply) {
        if (request.query.id) {
            const authorId = parseInt(request.query.id);
            if (!isNaN(authorId)) {
                // Maybe to change
                await (0, domain_1.deleteAuthor)(authorId);
                return reply.code(200).send('Delete Success');
            }
            else {
                return reply
                    .code(400)
                    .send(new Error('Author not existing'));
            }
        }
        return reply.code(400).send(new Error('Wrong parameters'));
    });
}
exports.authorsRoute = authorsRoute;
