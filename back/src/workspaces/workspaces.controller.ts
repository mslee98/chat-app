import { Controller, Get } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/Users';

@Controller('api/workspaces')
export class WorkspacesController {
    constructor(
        private workspacesService: WorkspacesService
    ) {}

    @Get()
    getMyWorkspaces(@User() user: Users) {

        console.log("dddddddddddddddddddddddddddddddddddddd")
        return this.workspacesService.findByWorkspaces(user.id);
    }

}
