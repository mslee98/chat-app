import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/Users';
import { DMs } from './entities/Dms';
import { DmsModule } from './dms/dms.module';
import { Workspaces } from './entities/Workspaces';
import { WorkspaceMembers } from './entities/Workspacemembers';
import { ChannelMembers } from './entities/Channelmembers';
import { Channels } from './entities/Channels';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelModule } from './channel/channel.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([Users, WorkspaceMembers, ChannelMembers]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'chatapp',
      autoLoadEntities: true,
      entities: [
        Users,
        // DMs
        WorkspaceMembers,
        Workspaces,
        ChannelMembers,
        Channels,
      ],
      keepConnectionAlive: true,
      charset: 'utf8mb4_general_ci',
      synchronize: false,
      logging: true
    }),
    AuthModule,
    UserModule,
    DmsModule,
    WorkspacesModule,
    ChannelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
