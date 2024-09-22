"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const data_source_1 = require("../../config/databases/data-source");
const entities_1 = require("./entities");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const dtos_1 = require("./dtos");
const find = (query = '', pagination) => {
    const take = pagination?.count <= 0 ? 50 : pagination?.count;
    const skip = pagination?.offset < 0 ? 0 : pagination?.offset;
    return data_source_1.AppDataSource.manager.find(entities_1.Person, {
        where: [
            { isDeleted: false, name: (0, typeorm_1.ILike)(`%${query}%`) },
            { isDeleted: false, paternal: (0, typeorm_1.ILike)(`%${query}%`) },
            { isDeleted: false, maternal: (0, typeorm_1.ILike)(`%${query}%`) },
        ],
        order: {
            name: 'ASC',
            paternal: 'ASC',
            maternal: 'ASC',
        },
        take: take,
        skip: skip,
    });
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
    await validateDto(createPersonDto);
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
const update = async (updatePersonDto) => {
    await validateDto(updatePersonDto);
    const person = await findById(updatePersonDto.id);
    const { name, paternal, maternal, address, phone } = updatePersonDto;
    person.name = name.toUpperCase().trim();
    person.paternal = paternal.toUpperCase().trim();
    person.maternal = maternal.toUpperCase().trim();
    person.address = address.toUpperCase().trim();
    person.phone = phone.trim();
    let data = { ...person };
    delete data.id;
    await data_source_1.AppDataSource.manager
        .createQueryBuilder()
        .update(entities_1.Person)
        .set(data)
        .where("id = :id", { id: person.id })
        .execute();
    return person;
};
const validateDto = async (dto) => {
    const errors = await (0, class_validator_1.validate)(dto);
    if (errors.length > 0) {
        const message = errors.map(err => Object.values(err.constraints))
            .flat()
            .join('\n');
        throw new Error(message);
    }
};
exports.resolvers = {
    Query: {
        getPersons: (parent, args, contextValue, info) => find(args.query, args.pagination),
        getPerson: (parent, args, contextValue, info) => findById(args.id),
    },
    Mutation: {
        createPerson: (parent, args, contextValue, info) => {
            const createPersonDto = new dtos_1.CreatePersonDto(args);
            return create(createPersonDto);
        },
        updatePerson: (parent, args, contextValue, info) => {
            const updatePersonDto = new dtos_1.UpdatePersonDto(args);
            return update(updatePersonDto);
        },
        removePerson: (parent, args, contextValue, info) => remove(args.id),
    }
};
//# sourceMappingURL=persons.resolver.js.map