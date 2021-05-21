import { Injectable, CanActivate, ExecutionContext, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthGuard implements CanActivate {
    httpService:HttpService =  new HttpService()
    configService: ConfigService =  new ConfigService()
    constructor(){}
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log(request.headers.authorization);
        const validate = await this.httpService.post(
            `${this.configService.get('MAIN_DOMANE')}/auth/validate`,{}, {
            headers: {
                Authorization: request.headers.authorization
            }
        }).toPromise().catch(er => console.log(er))        
        
        return validate['data']
    }
}