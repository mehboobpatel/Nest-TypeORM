import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

//this class name will autmtcly create a table called n nuser in the db
export class Nuser {

@PrimaryGeneratedColumn()
id : number;

@Column()
firstname : string;

@Column()
lastname : string;

@Column()
age : number;

}
