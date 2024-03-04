import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { UserTypeEnum } from 'src/user/enum/user-type.enum';
import { LoginDto } from '../dto/login.dto';
import { LoginPayloadDto } from '../dto/login-payload.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserTypeEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  
    if (!requiredRoles) {
      return true;
    };
    
    const { authorization } = context.switchToHttp().getRequest().headers;    
    const token = authorization?.split(' ')[1];
    
    try {
      const loginPayload: Partial<LoginDto> | undefined = await this.jwtService.verifyAsync(
        token, { secret: process.env.SECRET_OR_KEY }
      ).catch(() => undefined);

        if (!loginPayload) {
        return false;
      };
        
      return requiredRoles.some((role) => role === loginPayload.typeUser);
      } catch(error) {
      console.log(error);
      return false;
    }
  }
}