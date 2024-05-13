import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameFiled: 'email', passwordField: 'password' });
    }

    async validate(email: string, password: string, done: CallableFunction) {
        const user = await this.authService.validaterUser(email, password);

        if(!user) {
            throw new UnauthorizedException()
        }

        return done(null, user)
    }
}