import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_OR_KEY, 
      signOptions: { expiresIn: '1h' }, 
    }),
    UserModule,
  ],
  providers: [
    AuthService, 
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule {}
