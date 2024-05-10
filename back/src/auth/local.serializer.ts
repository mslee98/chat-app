import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/Users";
import { Repository } from "typeorm";

@Injectable()
export class LocalSerializer extends PassportSerializer {
    
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>
    ) {
        super();
    }

    serializeUser(user: Users, done: CallableFunction) {
        console.log("?????????????????")
        console.log(user);
        done(null, user.id);
    }

    async deserializeUser(userId: string, done: CallableFunction) {
        return await this.userRepository
        .findOneOrFail({
            where: { id: +userId },
            select: ['email'],
        })
        .then((user) => {
            done(null, user);
        })
        .catch((error) => done(error));
    }

}