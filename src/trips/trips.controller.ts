import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Trip } from "./trips.entity";
import { TripsService } from "./trips.service";

@Controller()
export class TripsController{

    constructor(private readonly tripsService : TripsService){}

    @Post('addTrip')
    async addTrip(@Body() trip : Trip){

        const response = await this.tripsService.addTrip(trip).then((trip : Trip)=>{
            if(trip===null || trip===undefined){
                return {status : 400, msg : "something went wrong"};
            }
            else{
                return {status : 200, msg : "Trip created Succesfully", trip};
            }
        }).catch(err=>{
            return {status : 400,msg : "something went wrong", err};
        });
        return response;
    }

    @Get('getAllTrips')
    async getAll(){
        const response = await this.tripsService.findAll().then((trips : Trip[])=>{
            if(trips===null || trips===undefined){
                return {status : 400, msg : "something went wrong"};
            }
            else{
                return {status : 200, msg : "Trips fetched Succesfully", trips};
            }
        }).catch(err=>{
            return {status : 400,msg : "something went wrong", err};
        });
        return response;
    }

    @Get('getTripsById/:tripId')
    async getTripsById(@Param('tripId') tripId : number){
        const response = await this.tripsService.findById(tripId).then((trip : Trip)=>{
            if(trip===null || trip===undefined){
                return {status : 400, msg : "No Trip found with given trip Id"};
            }
            else{
                return {status : 200, msg : "Trip fetched Succesfully", trip};
            }
        }).catch(err=>{
            return {status : 400,msg : "something went wrong", err};
        });
        return response;
    }

    @Get('getTripsByUser/:email')
    async getTripsByUser(@Param('email') email: string){
        const response = await this.tripsService.findByUser(email).then((trips : Trip[])=>{
            if(trips===null || trips===undefined){
                return {status : 400, msg : "Failed to fetch your trips"};
            }
            else{
                return {status : 200, msg : "Trips fetched Succesfully", trips};
            }
        }).catch(err=>{
            return {status : 400,msg : "something went wrong", err};
        });
        return response;
    }
}