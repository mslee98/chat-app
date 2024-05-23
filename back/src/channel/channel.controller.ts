import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { ChannelService } from './channel.service';
import { Users } from 'src/entities/Users';
import { PostChatDto } from './dto/post-chat.dto';

@ApiTags('CHANNEL')
@Controller('/api/workspace/:url/channel')
export class ChannelController {

    constructor(
        private channelService: ChannelService
    ) {}

    @Get()
    async getWorkspaceChannel(@Param('url') url, @User() user: Users) {
        return this.channelService.getWorkspaceChannel(url, user.id)
    }

    @Get(':name/chats')
    async getWorkspaceChannelChat(
        @Param('url') url: string,
        @Param('name') name: string
    ) {

        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")

        return this.channelService.getWorkspaceChannelChat({
            url,
            name
        })

    }

    @Post(':name/chats')
    async postChat(
        @Param('url') url: string,
        @Param('name') name: string,
        @Body() body: PostChatDto,
        @User() user
    ) {

        return this.channelService.postChat({
            url,
            name,
            content: body.content,
            myId: user.id
        })
    }
}
