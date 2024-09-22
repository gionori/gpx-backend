import { IsInt, IsPositive} from 'class-validator';
import { CreatePersonDto } from './create-person.dto';


export class UpdatePersonDto extends CreatePersonDto {

    @IsPositive()
    @IsInt()  
    id: number;


    constructor(data: any) {
        super(data);
        this.id = Number(data.id);
    }

}