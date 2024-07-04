import { registerAs } from "@nestjs/config";
import {config as dotenvConfig} from 'dotenv'
import { DataSource, DataSourceOptions } from "typeorm";


dotenvConfig({path: '.development.env'});

const config = {
    type: 'postgres',
    databse: process.env.DB_NAME,
    host: process.env.DB_HOST, //'host.docker.internal'
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    autoLoadEntities: true, //carga entidades automaticamente
    loggin:false,
    //synchronize:true, //dev stage
    dropSchema:true,  //dev stage
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);