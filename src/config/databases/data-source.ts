import "reflect-metadata";
import { DataSource } from "typeorm";


import { Person } from '../../app/persons/entities';


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "12345",
    database: "gpx",
    synchronize: true,
    logging: false,
    entities: [
        Person
    ],
    ssl: false,
    migrations: [],
    subscribers: [],
})
 