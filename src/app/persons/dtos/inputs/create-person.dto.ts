import { IsNotEmpty, Length, Matches } from 'class-validator';


export class CreatePersonDto {

    @Length(2, 200, { message: 'El nombre debe tener entre 2 y 200 caracteres de  longitud' })
    name: string;

    @Length(2, 200, { message: 'El apellido paterno debe tener entre 2 y 200 caracteres de  longitud' })
    paternal: string;

    @Length(2, 200, { message: 'El apellido materno debe tener entre 2 y 200 caracteres de  longitud' })
    maternal: string;

    @IsNotEmpty({ message: 'La dirección es requerida' })
    address: string;

    @Matches(/^\d{10}$/, { message: 'El número telefónico debe ser de 10 dígitos sin separadores' })
    phone: string;

    constructor(data: any) {
        this.name      = data.name;
        this.paternal  = data.paternal;
        this.maternal  = data.maternal;
        this.address   = data.address;
        this.phone     = data.phone;
    }
}