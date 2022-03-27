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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const fastify_1 = __importDefault(require("fastify"));
const controllers_1 = require("../controllers");
const authorSchema = __importStar(require("../schemas/json/author.json"));
const bookSchema = __importStar(require("../schemas/json/book.json"));
exports.server = (0, fastify_1.default)({
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
        reply.log.info({
            res: reply,
            err: error,
        }, error && error.message);
        void reply.send(error);
    }
    else {
        reply.log.error({
            req: request,
            res: reply,
            err: error,
        }, error && error.message);
        void reply.send({
            statusCode: 500,
            error: 'Internal Server error',
            message: '[TRUNCATED]',
        });
    }
})
    .register(controllers_1.authorsRoute, { prefix: '/authors' })
    .register(controllers_1.bookRoute, { prefix: '/books' });
