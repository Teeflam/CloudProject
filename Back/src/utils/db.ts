import '../setupEnv';

import dotenv from 'dotenv';
import { Connection, createConnection } from 'typeorm';

dotenv.config();

export const conn = async (): Promise<Connection> => {
    return createConnection({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASS,
        entities: [__dirname + '/entities/*{.ts,.js}'],
        synchronize: true,
    });
};
