import { Module } from '@nestjs/common';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channels } from 'src/entities/Channels';

@Module({
  imports: [TypeOrmModule.forFeature([Channels])],
  controllers: [ChannelController],
  providers: [ChannelService]
})
export class ChannelModule {}
