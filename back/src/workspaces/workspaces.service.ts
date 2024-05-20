import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkspaceMembers } from 'src/entities/Workspacemembers';
import { Workspaces } from 'src/entities/Workspaces';
import { Repository } from 'typeorm';

@Injectable()
export class WorkspacesService {
    constructor(

        @InjectRepository(WorkspaceMembers)
        private workspaceMembersRepository: Repository<Workspaces>,

        @InjectRepository(Workspaces)
        private workspacesRepository: Repository<Workspaces>
    ) {}

    async findByWorkspaces(id: number) {
        return this.workspacesRepository.find({
            where: {
                WorkspaceMembers: [{UserId: id}]
            },

        })

    }
}
