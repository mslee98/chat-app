import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channels } from 'src/entities/Channels';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelService {

    constructor(
        @InjectRepository(Channels)
        private channelRepository: Repository<Channels>
    ) {}

    async getWorkspaceChannel(url: any, id: any) {

        console.log("@@@@@@@@@@@@@@@@@@@", url, id);

        return this.channelRepository.createQueryBuilder('channels')
                .innerJoinAndSelect(
                    'channels.ChannelMembers',
                    'channelMembers',
                    'channelMembers.userId = :id', {id},
                )
                .innerJoinAndSelect(
                    'channels.Workspace',
                    'workspace',
                    'workspace.url = :url', {url},
                )
                .getMany();
        }
}

