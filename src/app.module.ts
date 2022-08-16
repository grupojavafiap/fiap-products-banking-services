import { PersonalAccountsService } from './personal-accounts/personal-accounts.service';
import { PersonalAccountsController } from './personal-accounts/personal-accounts.controller';
import { ParticipantsService } from './participants/participants.service';
import { ParticipantsController } from './participants/participants.controller';
import { CacheModule, Module, } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PaginateService } from './shared/paginate.service';
import { ScheduleModule } from '@nestjs/schedule';

import * as redisStore from 'cache-manager-redis-store';



@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD
    }),
    ScheduleModule.forRoot(),
    HttpModule
  ],
  controllers: [
    PersonalAccountsController,
    ParticipantsController],
  providers: [
    PersonalAccountsService,
    ParticipantsService, 
    PaginateService
  ]
})
export class AppModule { }
