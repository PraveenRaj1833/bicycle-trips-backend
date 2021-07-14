import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Trip } from './trips/trips.entity';
import { TripsModule } from './trips/trips.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    TripsModule,
    ConfigModule.forRoot({isGlobal : true}),
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "postgres",
      "password": "rgukt123",
      "database": "assignment",
      "entities":[User,Trip]
    }),
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
