
import { AppDataSource } from '../../config/databases/data-source';
import { Person } from './entities';
import { CreatePersonDto } from './dtos';
import { validate } from 'class-validator';


const find = (): Promise<Person[]> => {
  return AppDataSource.manager.find(Person);
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



const create = async (createPersonDto: CreatePersonDto): Promise<Person|string> => {
    const errors = await validate(createPersonDto);

    if (errors.length > 0) {
      const message: string = errors.map(err => Object.values(err.constraints))
        .flat()
        .join('\n');

      throw new Error(message);
    }
        
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



export const resolvers = {
    Query: {
      getPersons: () => find(),
      getPerson: (parent: any, args: any, contextValue: any, info: any) => findById(args.id),
    },
    
    Mutation: {
      createPerson: (parent: any, args: any, contextValue: any, info: any) => {
        const { name, paternal, maternal, address, phone } = args;

        const createPersonDto     = new CreatePersonDto();
        createPersonDto.name      = name;
        createPersonDto.paternal  = paternal;
        createPersonDto.maternal  = maternal;
        createPersonDto.address   = address;
        createPersonDto.phone     = phone;

        return create(createPersonDto);
      },

      removePerson: (parent: any, args: any, contextValue: any, info: any) => remove(args.id),
    }
};