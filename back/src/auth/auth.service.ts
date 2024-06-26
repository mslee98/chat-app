import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/entities/Users';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>
    ) {}

    async validaterUser(email: string, password: string) {

        const user = await this.userRepository.findOne({
            where: {email},
            select: ['id', 'email', 'password']
        });

        if(!user) {
            return null
        }
        const result = await bcrypt.compare(password, user.password);

        if(result) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }

        return null;
    }


}
