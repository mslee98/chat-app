import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { ChannelService } from './channel.service';
import { Users } from 'src/entities/Users';

@ApiTags('CHANNEL')
@Controller('api/workspace/:url/channel')
export class ChannelController {

    constructor(
        private channelService: ChannelService
    ) {}

    @Get()
    async getWorkspaceChannel(@Param('url') url, @User() user: Users) {

        console.log("####################################")
        console.log("####################################")
        console.log("####################################")
        console.log("####################################")
        console.log("####################################")
        console.log("####################################")
        console.log("####################################")
        console.log("####################################")
        console.log("####################################")
        console.log("####################################")
        console.log("####################################")
        console.log("####################################")

        return this.channelService.getWorkspaceChannel(url, user.id)
    }
}
