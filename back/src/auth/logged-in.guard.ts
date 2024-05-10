import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";



/**
 * Local-auth.Guard는 request로 들어온 요청이 오면 요청 후 request로 실행됨(Nest Guard 개념)
 * 
 * Local-auth.Guard는 AuthGuard로 부터 상속받아 사용함
 * 
 */
@Injectable()
export class LoggedInGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return request.isAuthenicated();
        
    }
}