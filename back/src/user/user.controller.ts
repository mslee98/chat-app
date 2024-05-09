import { Controller, Post, Req } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { JoinRequestDto } from './dto/join.request.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('USER')
@Controller('/api/user')
export class UserController {
    
    @ApiOperation({ summary: 'Log-In'})
    @Post()
    Login(@User() user: JoinRequestDto) {
        console.log(user)
        console.log("Login 요청")
    }

}
