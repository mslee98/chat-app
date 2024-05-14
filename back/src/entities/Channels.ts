import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ChannelMembers } from "./Channelmembers";

@Entity({ schema: 'chatapp', name: 'channels' })
export class Channels {
    @PrimaryGeneratedColumn({type: 'int', name: 'id'})
    id: number;

    @Column('varchar', {name: 'name', length: 30})
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;


    /**
     * 채녈과 채널멤버스 관계 설정
     * 채
     */
    @OneToMany(() => ChannelMembers, (channelMembers) => channelMembers.Channel, {
        cascade: ['insert']
    })
    ChannelMembers: ChannelMembers[];
}