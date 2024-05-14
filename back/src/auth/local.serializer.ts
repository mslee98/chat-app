import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/Users";
import { Repository } from "typeorm";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalSerializer extends PassportSerializer {
    
    constructor(

        private readonly authService: AuthService,//아.. 이거 연결하니까 실행되네;;

        @InjectRepository(Users)
        private userRepository: Repository<Users>
    ) {
        super();
    }   

    serializeUser(user: Users, done: CallableFunction) {
        done(null, user.id);
    }

    async deserializeUser(userId: any, done: CallableFunction) {
        return await this.userRepository
        .findOneOrFail({
            where: { id: +userId },
            select: ['email'],
        })
        .then((user) => {
            done(null, user);
        })
        .catch((error) => {
            console.log("error!!!!!!!!!!!!!!!!!!!!!!!!!!")
            done(error)
        });
    }

}