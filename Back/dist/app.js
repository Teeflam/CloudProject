"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const fastify_1 = require("./lib/fastify");
const utils_1 = require("./utils");
async function run() {
    var _a;
    await fastify_1.server.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000).catch(console.error);
    return (0, utils_1.conn)();
}
exports.run = run;
