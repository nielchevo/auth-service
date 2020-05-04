import { Injectable, Post, HttpService, Catch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserAuthEntity } from './entity';
import { access } from 'fs';

@Injectable()
export class AppService {

  constructor() {}
  
  getHello(): string {
    return 'Hello World!';
  }
}
