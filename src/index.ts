import { readFileSync } from 'fs';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { AppDataSource } from "./config/databases/data-source"
import { resolvers } from "./app/persons";


AppDataSource.initialize().then(async () => {
    console.log('🚀 Base de datos inicializada');

    const typeDefs = readFileSync('./src/schema.graphql', { encoding: 'utf-8' });

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    return startStandaloneServer(server, { listen: { port: 4000 } });
  })
  .then(({ url }) => console.log(`🚀  Servidor listo en: ${url}`))
  .catch(error => console.error(error))
