import { Body, Controller, ForbiddenException, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { UserService } from './user.service';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/Users';
import { NotLoggedInGuard } from 'src/auth/not-logged-in.guard';
import { JoinRequestDto } from './dto/join.request.dto';

@ApiTags('USER')
@Controller('/api/user')
export class UserController {
    
    constructor(
        private userService: UserService
    ) {}

    @ApiOperation({ summary: 'Log-In'})
    @Post('login')
    @UseGuards(LocalAuthGuard)
    // @UseGuards(AuthGuard('local'))
    async Login(@User() user: Users) {
        console.log("!!!!user : ", user)
        return user 
    }

    @ApiOperation({ summary: 'Sign-Up'})
    @Post('signup')
    @UseGuards(NotLoggedInGuard)
    async Signup(@Body() data: JoinRequestDto) {

        console.log("들어오는 data", data)

        const result = await this.userService.join(
            data.email,
            data.password
        );

        console.log("여기까지 왔나?")
    }

}
