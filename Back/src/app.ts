import { Connection } from 'typeorm';

import { server } from './lib/fastify';
import { conn } from './utils';

export async function run(): Promise<Connection> {
    await server.listen(process.env.PORT ?? 3000).catch(console.error);
    return conn();
}
