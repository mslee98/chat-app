import { Body, Controller, ForbiddenException, Get, Post, UseGuards } from '@nestjs/common';
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

    @ApiOperation({ summary: 'Get-User-Info'})
    @Get()
    async getUserInfo(@User() user: Users) {
        console.log("sssssssssssss",user)
        return user || false;
    }

    @ApiOperation({ summary: 'Log-In'})
    @Post('login')
    @UseGuards(LocalAuthGuard)// new LocalAuthGuard()로 해도 상관은 없지만 LocalAuthGuard라고 하면 Nest에서 임시 인스턴스를 생성해준다고 함.
    // @UseGuards(AuthGuard('local'))
    async Login(@User() user: Users) {
        return user 
    }

    @ApiOperation({ summary: 'Sign-Up'})
    @Post('signup')
    @UseGuards(NotLoggedInGuard)
    async Signup(@Body() data: JoinRequestDto) {

        const result = await this.userService.join(
            data.email,
            data.password
        );
    }

}
