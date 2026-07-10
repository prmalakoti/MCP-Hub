import * as dotenv from 'dotenv';
dotenv.config();

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

console.log(process.env.DB_HOST);
console.log(process.env.DB_USERNAME);
console.log(process.env.DB_DATABASE);


export const databaseConfig: TypeOrmModuleOptions = {
    type: 'mysql',

    host: process.env.DB_HOST,

    port: Number(process.env.DB_PORT),

    username: process.env.DB_USERNAME,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_DATABASE,

    autoLoadEntities: true,

    synchronize: true,
};