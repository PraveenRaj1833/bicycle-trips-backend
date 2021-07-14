import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('trips')
export class Trip{
    @PrimaryGeneratedColumn({name : 'trip_id'})
    tripId : number;

    @Column({name : 'starting_point'})
    startingPoint : string;

    @Column({name : 'farthest_point'})
    farthestPoint : string;

    @Column()
    back : boolean;

    @Column()
    distance : number;

    @ManyToOne(()=>User, user => user.trips)
    @JoinColumn({name : 'user_id'})
    user : User;
}