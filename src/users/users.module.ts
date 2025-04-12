import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/shared/schema/users';
import { UsersService } from './users.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/shared/middleware/roles.guard';
import { AuthMiddleware } from 'src/shared/middleware/auth';
@Module({
  imports: [
    TypeOrmModule.forFeature([Users]), 
  ],
  controllers: [UsersController],
  providers: [ UsersService , UserRepository,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },

  ],
  
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/users', method: RequestMethod.GET });
  }
}
















/*
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/shared/schema/users';
import { UsersService } from './users.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/shared/middleware/roles.guard';
import { AuthMiddleware } from 'src/shared/middleware/auth';
@Module({
  imports: [
    TypeOrmModule.forFeature([Users]), 
  ],
  controllers: [UsersController],
  providers: [ UsersService , UserRepository,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },

  ],
  
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/users', method: RequestMethod.GET });
  }
}*/

