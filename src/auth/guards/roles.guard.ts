import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor() {}
    canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if(user.admin){
            return true;
        }
        throw new HttpException('You are not ADMIN!',HttpStatus.UNAUTHORIZED)
    }

}
