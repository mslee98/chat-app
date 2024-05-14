import { Column, CreateDateColumn, Entity, JoinColumn, UpdateDateColumn } from "typeorm";
import { Channels } from "./Channels";

@Entity({schema: 'chatapp', name: 'channelmembers'})
export class ChannelMembers {
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column('int', { primary: true, name: 'ChannelId' })
    ChannelId: number;

    @Column('int', { primary: true, name: 'UserId' })
    UserId: number;

    @JoinColumn([{ name: 'ChannelId', referencedColumnName: 'id' }])
    Channel: Channels;
}