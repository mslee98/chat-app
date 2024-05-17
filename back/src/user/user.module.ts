import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/Workspacemembers';
import { Workspaces } from 'src/entities/Workspaces';
import { ChannelMembers } from 'src/entities/Channelmembers';

@Module({
  imports: [TypeOrmModule.forFeature([Users, WorkspaceMembers, Workspaces, ChannelMembers])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
