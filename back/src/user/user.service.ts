import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import * as bcrypt from 'bcrypt';
import { DataSource, Repository } from 'typeorm';
import { Channels } from 'src/entities/Channels';
import { query } from 'express';
import { WorkspaceMembers } from 'src/entities/Workspacemembers';
import { ChannelMembers } from 'src/entities/Channelmembers';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,

        @InjectRepository(WorkspaceMembers)
        private workspaceMembersRepository: Repository<WorkspaceMembers>,
        
        private dataSource: DataSource,
    ) {}
    
    getAllUsers() {
        return this.userRepository.find({
            select: ['id', 'email', 'password', 'nickname']
        })
    }


    async findOne(email: string) {
        return this.userRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'nickname']
        })
    }

    async join(email: string, password: string, nickname: string) {
        console.log("email 값이 안들어오나?",email)
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        const user = await queryRunner.manager.getRepository(Users).findOne({where: {email}});

        if(user) {
            throw new ForbiddenException('이미지 존재하는 사용자입니다.');
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        try {
            const returned = await queryRunner.manager.getRepository(Users).save({
                email,
                password: hashedPassword,
                nickname
            })

            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", returned)

            const workspaceMember = queryRunner.manager.getRepository(WorkspaceMembers).create();
            workspaceMember.UserId = returned.id;
            workspaceMember.WorkspaceId = 1;

            await queryRunner.manager.getRepository(WorkspaceMembers).save(workspaceMember);

            await queryRunner.manager.getRepository(ChannelMembers).save({
                UserId: returned.id,
                ChannelId: 1                
            })

            await queryRunner.commitTransaction();

        } catch (error) {
            console.log("회원 가입중 에러... rollback",error);
            await queryRunner.rollbackTransaction()
        } finally {
            await queryRunner.release();            
        }

    }
}
