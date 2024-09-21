"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const data_source_1 = require("../../config/databases/data-source");
const entities_1 = require("./entities");
const dtos_1 = require("./dtos");
const class_validator_1 = require("class-validator");
const find = () => {
    return data_source_1.AppDataSource.manager.find(entities_1.Person);
};
const findById = async (id) => {
    if (!id) {
        throw new Error(`El ID es necesario para buscar a la persona`);
    }
    const [person] = await data_source_1.AppDataSource.manager.findBy(entities_1.Person, { id: id });
    if (!person) {
        throw new Error(`Persona con ID ${id} no se encuentra en la base de datos`);
    }
    return person;
};
const remove = async (id) => {
    const person = await findById(id);
    const resp = await data_source_1.AppDataSource.manager
        .createQueryBuilder()
        .update(entities_1.Person)
        .set({ isDeleted: true })
        .where("id = :id", { id: id })
        .execute();
    if (resp.affected > 0) {
        person.isDeleted = true;
        return person;
    }
    return person;
};
const create = async (createPersonDto) => {
    const errors = await (0, class_validator_1.validate)(createPersonDto);
    if (errors.length > 0) {
        const message = errors.map(err => Object.values(err.constraints))
            .flat()
            .join('\n');
        throw new Error(message);
    }
    const { name, paternal, maternal, address, phone } = createPersonDto;
    const person = new entities_1.Person();
    person.name = name.toUpperCase().trim();
    person.paternal = paternal.toUpperCase().trim();
    person.maternal = maternal.toUpperCase().trim();
    person.address = address.toUpperCase().trim();
    person.phone = phone.trim();
    await data_source_1.AppDataSource.manager.insert(entities_1.Person, person);
    return person;
};
exports.resolvers = {
    Query: {
        getPersons: () => find(),
        getPerson: (parent, args, contextValue, info) => findById(args.id),
    },
    Mutation: {
        createPerson: (parent, args, contextValue, info) => {
            const { name, paternal, maternal, address, phone } = args;
            const createPersonDto = new dtos_1.CreatePersonDto();
            createPersonDto.name = name;
            createPersonDto.paternal = paternal;
            createPersonDto.maternal = maternal;
            createPersonDto.address = address;
            createPersonDto.phone = phone;
            return create(createPersonDto);
        },
        removePerson: (parent, args, contextValue, info) => remove(args.id),
    }
};
//# sourceMappingURL=persons.resolver.js.map