import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService{
    constructor(@InjectRepository(User) private userRepository : Repository<User>){}

    findAll() : Promise<User[]>{
        return this.userRepository.find({relations : ["trips"]});
    }

    findByEmal(email : string) {
        return this.userRepository.findOne(email,{relations : ["trips"]});
    }

    addUser(user : User){
        return this.userRepository.save(user);
    }
}