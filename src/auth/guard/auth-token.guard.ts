import { CanActivate, ExecutionContext } from "@nestjs/common";




export class AuthTokenGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean>  {
        // Implement your token validation logic here
        return true;
    }
    }