"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const entities_1 = require("../../app/persons/entities");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "12345",
    database: "gpx",
    synchronize: true,
    logging: false,
    entities: [
        entities_1.Person
    ],
    ssl: false,
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map