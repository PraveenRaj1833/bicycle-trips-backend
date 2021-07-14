import { Trip } from "src/trips/trips.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity('users')
export class User{
    @PrimaryColumn()
    email : string;

    @Column()
    name : string;

    @Column()
    password : string;

    @OneToMany(()=>Trip, trip=>trip.user)
    trips : Trip[];


}