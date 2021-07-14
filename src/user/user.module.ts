import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Trip } from "src/trips/trips.entity";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Module({
    imports : [TypeOrmModule.forFeature([User,Trip])],
    controllers : [UserController],
    providers : [UserService]
})
export class UserModule{}