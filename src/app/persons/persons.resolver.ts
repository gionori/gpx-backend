
import { AppDataSource } from '../../config/databases/data-source';
import { Person } from './entities';
import { validate } from 'class-validator';
import { ILike } from 'typeorm';


import { CreatePersonDto, PersonsResult, UpdatePersonDto } from './dtos';
import { Pagination } from '../core/interfaces/';


const find = async (query: string = '', pagination: Pagination): Promise<PersonsResult> => {
  const take: number = pagination?.count <= 0 ? 50 : pagination?.count;
  const skip: number = pagination?.offset < 0 ? 0 : pagination?.offset;

  const where = [
    { isDeleted: false, name    : ILike(`%${ query }%`) },
    { isDeleted: false, paternal: ILike(`%${ query }%`) },
    { isDeleted: false, maternal: ILike(`%${ query }%`) },      
  ];

  const count = await AppDataSource.manager.countBy(Person, where);

  const persons = await AppDataSource.manager.find(Person, {
    where: where,
    order: {
      name: 'ASC',
      paternal: 'ASC',
      maternal: 'ASC',
    },
    take: take,
    skip: skip,
  });

  return { persons, count };
}


const findById = async (id: number): Promise<Person> => {
  if (!id) {
    throw new Error(`El ID es necesario para buscar a la persona`);
  }

  const [ person ] = await AppDataSource.manager.findBy(Person, { id: id });
  
  if (!person) {
    throw new Error(`Persona con ID ${ id } no se encuentra en la base de datos`);
  } 

  return person;
}


const remove = async (id: number): Promise<Person> => {
  const person = await findById(id);

  const resp = await AppDataSource.manager
    .createQueryBuilder()
    .update(Person)
    .set({ isDeleted: true })
    .where("id = :id", { id: id })
    .execute();

  if (resp.affected > 0) {
    person.isDeleted = true;
    return person;
  }

  return person;
}



const create = async (createPersonDto: CreatePersonDto): Promise<Person> => {
    await validateDto(createPersonDto);
        
    const { name, paternal, maternal, address, phone } = createPersonDto;
      
    const person    = new Person();
    person.name     = name.toUpperCase().trim();
    person.paternal = paternal.toUpperCase().trim();
    person.maternal = maternal.toUpperCase().trim();
    person.address  = address.toUpperCase().trim();
    person.phone    = phone.trim();
      
    await AppDataSource.manager.insert(Person, person);
    return person;
}




const update = async (updatePersonDto: UpdatePersonDto): Promise<Person> => {
  await validateDto(updatePersonDto);
    
  const person = await findById(updatePersonDto.id);
  const { name, paternal, maternal, address, phone } = updatePersonDto;
    
  person.name     = name.toUpperCase().trim();
  person.paternal = paternal.toUpperCase().trim();
  person.maternal = maternal.toUpperCase().trim();
  person.address  = address.toUpperCase().trim();
  person.phone    = phone.trim();
  let data: any = { ...person };
  delete data.id;
    
  await AppDataSource.manager
    .createQueryBuilder()
    .update(Person)
    .set(data)
    .where("id = :id", { id: person.id })
    .execute();

  return person;
}



const validateDto = async (dto: any) => {
  const errors = await validate(dto);

  if (errors.length > 0) {
    const message: string = errors.map(err => Object.values(err.constraints))
    .flat()
    .join('\n');
    
    throw new Error(message);
  }
};



export const resolvers = {
    Query: {
      getPersons: (parent: any, args: any, contextValue: any, info: any) => find(args.query, args.pagination),
      getPerson: (parent: any, args: any, contextValue: any, info: any) => findById(args.id),
    },
    
    Mutation: {
      createPerson: (parent: any, args: any, contextValue: any, info: any) => {
        const createPersonDto = new CreatePersonDto(args);
        return create(createPersonDto);
      },

      updatePerson: (parent: any, args: any, contextValue: any, info: any) => {        
        const updatePersonDto = new UpdatePersonDto(args);
        return update(updatePersonDto);
      },

      removePerson: (parent: any, args: any, contextValue: any, info: any) => remove(args.id),
    }
};