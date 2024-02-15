import {  ExecutionContext, Injectable } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local'){
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }
}