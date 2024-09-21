import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Person {

    @PrimaryGeneratedColumn()
    id: number;


    @Index()
    @Column({ type: "varchar", length: 200 })
    name: string;

    @Index()
    @Column({ type: "varchar", length: 200 })
    paternal: string;

    @Index()
    @Column({ type: "varchar", length: 200 })
    maternal: string;

    @Column({ type: "text" })
    address: string;


    @Column({ type: "varchar", length: 10 })
    phone: string;


    @Column({ type: "boolean", default: false, name: 'is_deleted'})
    isDeleted: boolean;

}