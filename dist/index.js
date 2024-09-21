"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const data_source_1 = require("./config/databases/data-source");
const persons_1 = require("./app/persons");
data_source_1.AppDataSource.initialize().then(async () => {
    console.log('🚀 Base de datos inicializada');
    const typeDefs = (0, fs_1.readFileSync)('./src/schema.graphql', { encoding: 'utf-8' });
    const server = new server_1.ApolloServer({
        typeDefs,
        resolvers: persons_1.resolvers,
    });
    return (0, standalone_1.startStandaloneServer)(server, { listen: { port: 4000 } });
})
    .then(({ url }) => console.log(`🚀  Servidor listo en: ${url}`))
    .catch(error => console.error(error));
//# sourceMappingURL=index.js.map