import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { TripsController } from "./trips.controller";
import { Trip } from "./trips.entity";
import { TripsService } from "./trips.service";

@Module({
    imports : [TypeOrmModule.forFeature([User,Trip])],
    controllers : [TripsController],
    providers : [TripsService]
})
export class TripsModule{

}