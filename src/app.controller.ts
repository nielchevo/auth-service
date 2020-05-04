import { Controller, Get, Query, HttpService, Body, Post, Header, Res, HttpException } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  async GetHealthCheck(@Res() res: Response) {
    try {
      res.status(200).json({ success: true, message: "i'm alive...", data:'alive' });
    } catch (error) {
      throw new HttpException("service is down", 503);
    }
  }
}
