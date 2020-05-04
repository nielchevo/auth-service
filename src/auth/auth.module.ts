import { Module, HttpModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthEntity } from 'src/entity';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ 
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return ({ 
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: "7d" }
        })
      }
    }),  
    // TypeOrmModule.forFeature([UserAuthEntity]),
    HttpModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})

export class AuthModule {}
