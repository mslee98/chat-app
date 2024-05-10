import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index('email', ['email'], {unique: true})
@Entity({ schema: 'chatapp', name: 'users' })
export class Users {

    @PrimaryGeneratedColumn({type: 'int', name: 'id'})
    id: number;

    @Column('varchar', {name: 'email', unique: true, length: 30})
    email: string;

    @Column('varchar', {name: 'password', length: 100})
    password: string;
}