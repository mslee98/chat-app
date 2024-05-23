import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelChats } from 'src/entities/ChannelChats';
import { Channels } from 'src/entities/Channels';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelService {
    constructor(
        @InjectRepository(Channels)
        private channelRepository: Repository<Channels>,

        @InjectRepository(ChannelChats)
        private channelChatRepository: Repository<ChannelChats>,

    ) {}

    async getWorkspaceChannel(url: any, id: any) {

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

    async getWorkspaceChannelChat({ url, name }) {
        return this.channelChatRepository
          .createQueryBuilder('channelChats')
          .innerJoin('channelChats.Channel', 'channel', 'channel.name = :name', {
            name,
          })
          .innerJoin('channel.Workspace', 'workspace', 'workspace.url = :url', {
            url,
          })
          .innerJoinAndSelect('channelChats.User', 'user')
          .orderBy('channelChats.createdAt', 'DESC')
        //   .take(perPage)
        //   .skip(perPage * (page - 1))
          .getMany();

        
    }

    async postChat({url, name, content, myId}) {
        
        const channel = await this.channelRepository
            .createQueryBuilder('channel')
            .innerJoin('channel.Workspace', 'workspace', 'workspace.url = :url', {url})
            .getOne();
            
        if(!channel) {
            throw new NotFoundException('없는 채널임')
        }

        const chats = new ChannelChats();
        chats.content = content;
        chats.UserId = myId;
        chats.ChannelId = channel.id;

        const saveChat = await this.channelChatRepository.save(chats)
    }
    
}

