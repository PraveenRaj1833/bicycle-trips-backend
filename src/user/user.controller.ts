import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import * as bcrypt from 'bcrypt';

@Controller()
export class UserController{

    constructor(private readonly userService : UserService){}

    @Post('addUser')
    async addUser(@Body() user : User){
        const password = user.password;
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password,saltOrRounds);
        user.password = hash;
        return this.userService.addUser(user);
    }

    @Get('getAllUsers') 
    getAllUsers(){
        return this.userService.findAll();
    }

    @Get('getById/:email')
    async getUserByEmail(@Param('email') email : string){
        const response = await this.userService.findByEmal(email).then((user : User)=>{
            if(user===null || user===undefined){
                return {status : 400, msg : "No User exist with given Id"};
            }
            else{
                const {password, ...result} = user;
                return {status : 200, user : result};
            }
        }).catch(err=>{
            return {status : 400, msg : "something went wrong", err};
        })
        return response;
    }

    @Post('login')
    async login(@Body() user:any){
        const passwd = user.password;
        const response = await this.userService.findByEmal(user.email).then(async (user1 : User)=>{
            if(user1!==null && user1!==undefined){
                if(await bcrypt.compare(passwd,user1.password)){
                    return {msg : "login succesful", status : 200};
                }
                else{
                    return {msg : "wrong password",status : 400};
                }
            }
            else{
                return {msg : "user Id does not exist",status : 400};
            }
        }).catch(err=>{
            console.log(err);
            return err;
        });
        return response;
    }
}