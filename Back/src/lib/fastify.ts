import fastify from 'fastify';

import { authorsRoute, bookRoute } from '../controllers';
import * as authorSchema from '../schemas/json/author.json';
import * as bookSchema from '../schemas/json/book.json';

export const server = fastify({
    logger: process.env.NODE_ENV !== 'test',
})
    .register(require('fastify-cors'), {
        origin: '*',
        credentials: true,
    })
    .addSchema(authorSchema)
    .addSchema(bookSchema)
    .setErrorHandler((error, request, reply) => {
        if (reply.statusCode < 500) {
            reply.log.info(
                {
                    res: reply,
                    err: error,
                },
                error && error.message
            );
            void reply.send(error);
        } else {
            reply.log.error(
                {
                    req: request,
                    res: reply,
                    err: error,
                },
                error && error.message
            );
            void reply.send({
                statusCode: 500,
                error: 'Internal Server error',
                message: '[TRUNCATED]',
            });
        }
    })
    .register(authorsRoute, { prefix: '/authors' })
    .register(bookRoute, { prefix: '/books' });
