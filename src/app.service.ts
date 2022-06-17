import { Injectable } from '@nestjs/common';
import { response } from 'express';

@Injectable()
export class AppService {
  getHello(): any {
    return {message: 'this is fine.. all be ok'};
  }
}
