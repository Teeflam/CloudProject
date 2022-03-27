import { FastifyInstance, FastifyReply } from 'fastify';

import {
    addAuthor,
    deleteAuthor,
    getAllAuthor,
    getAuthorByReserch,
    getAuthorId,
    updateAuthor,
} from '../domain';
import * as authorSchema from '../schemas/json/author.json';
import { Author } from '../schemas/types/author';

interface IAuthorQueryString {
    researchWord?: string;
    id?: string;
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function authorsRoute(fastify: FastifyInstance): Promise<void> {
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
    fastify.get<{ Querystring: IAuthorQueryString }>(
        '/',
        async function (request, reply): Promise<FastifyReply> {
            if (request.query.id) {
                const authorId = parseInt(request.query.id);
                if (!isNaN(authorId)) {
                    const resultWithId = await getAuthorId(authorId);
                    return reply.code(200).send(resultWithId);
                } else {
                    return reply
                        .code(400)
                        .send(new Error('Author not existing'));
                }
            } else if (request.query.researchWord) {
                const result = await getAuthorByReserch(
                    request.query.researchWord
                );
                return reply.code(200).send(result);
            } else {
                return reply.code(400).send(new Error('Wrong query'));
            }
        }
    );

    fastify.get('/all', async function (req, rep): Promise<FastifyReply> {
        return rep.code(200).send(await getAllAuthor());
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
    fastify.post<{ Body: Author }>(
        '/',
        { schema: { body: authorSchema, response: { 200: authorSchema } } },
        async function (request, reply): Promise<FastifyReply> {
            const authorInfo = await addAuthor(
                request.body.author_name,
                request.body.born,
                request.body.died ? request.body.died : undefined
            );
            return reply.code(201).send(authorInfo);
        }
    );

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
    fastify.put<{ Body: Author }>(
        '/',
        {
            schema: {
                body: authorSchema,
                response: { 200: authorSchema },
            },
        },
        async function (request, reply): Promise<FastifyReply> {
            if (request.body.author_id) {
                const authorInfo = await updateAuthor(
                    request.body.author_id,
                    request.body.author_name,
                    request.body.born,
                    request.body.died
                );
                if (authorInfo) {
                    return reply.code(200).send(authorInfo);
                } else {
                    return reply
                        .code(400)
                        .send(new Error('Author not modified'));
                }
            } else {
                return reply.code(400).send(new Error('Bad Request'));
            }
        }
    );

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
    fastify.delete<{ Querystring: IAuthorQueryString }>(
        '/',
        async function (request, reply): Promise<FastifyReply> {
            if (request.query.id) {
                const authorId = parseInt(request.query.id);
                if (!isNaN(authorId)) {
                    // Maybe to change
                    await deleteAuthor(authorId);
                    return reply.code(200).send('Delete Success');
                } else {
                    return reply
                        .code(400)
                        .send(new Error('Author not existing'));
                }
            }
            return reply.code(400).send(new Error('Wrong parameters'));
        }
    );
}
