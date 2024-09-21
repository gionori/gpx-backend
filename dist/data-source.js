"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var entity_1 = require("./entity");
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
        entity_1.Person
    ],
    ssl: false,
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map