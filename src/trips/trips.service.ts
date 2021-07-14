import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, Repository } from "typeorm";
import { Trip } from "./trips.entity";

@Injectable()
export class TripsService{
    constructor(@InjectRepository(Trip) private tripsRepository : Repository<Trip>){}

    findAll(){
        return this.tripsRepository.find();
    }

    findById(tripId){
        return this.tripsRepository.findOne(tripId);
    }

    addTrip(trip : Trip){
        return this.tripsRepository.save(trip);
    }

    async findByUser(email : string){
        return await getConnection().createQueryBuilder().select("trips").from(Trip,"trips")
                    .where("trips.user_id = :user_id",{user_id : email}).getMany();
    }
}