import { Person } from '@persons/entities';
export declare const typeDefs = "#graphql\n    type Person {\n        id: Int\n        name: String\n        paternal: String\n        maternal: String\n        address: String\n        phone: String\n        isDeleted: Boolean\n    }\n\n    type Query {\n        persons: [Person]\n    }\n";
export declare const resolvers: {
    Query: {
        persons: () => Promise<Person[]>;
    };
};
