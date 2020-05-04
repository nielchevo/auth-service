import { Controller, Post, Header, Body, Headers, Res, UseGuards, Req, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthBodyInput } from './auth.dto';
import { Response, Request } from 'express';

@Controller()
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    @Header('Content-Type', 'application/json')
    async GetSingleLoginToken(@Body() payload: AuthBodyInput, @Res() res:Response) 
    {
        const data = await this.authService.UserLogin(payload.data.npp_id, payload.data.password);
        return res.status(200).json({
            status: true, message: "auth token created.", data: data
        });
    }

    @Get('/verify')
    async VerifyAuthToken(@Query() { token }, @Res() res: Response) {
        const splittedToken = token.split(' ');

        const data = await this.authService.verifyToken(splittedToken[1]);

        return res.status(200).json({
            status: true, message: "auth token verified", data: data
        });
    }
}
