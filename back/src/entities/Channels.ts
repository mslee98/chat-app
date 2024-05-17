import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ChannelMembers } from "./Channelmembers";
import { Workspaces } from "./Workspaces";
import { Users } from "./Users";

@Index('WorkspaceId', ['WorkspaceId'], {})
@Entity({ schema: 'chatapp' })
export class Channels {
    @PrimaryGeneratedColumn({type: 'int', name: 'id'})
    id: number;

    @Column('varchar', {name: 'name', length: 30})
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @Column('int', { name: 'WorkspaceId', nullable: true})
    WorkspaceId: number | null;

    /**
     * 채녈과 채널멤버스 관계 설정
     * 채
     */
    @OneToMany(() => ChannelMembers, (channelMembers) => channelMembers.Channel, {
        cascade: ['insert']
    })
    ChannelMembers: ChannelMembers[];

    @ManyToOne(() => Workspaces, (workspace) => workspace.Channels, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn([{ name: 'WorkspaceId', referencedColumnName: 'id'}])
    Workspace: Workspaces;

    @ManyToMany(() => Users, (users) => users.Channels)
    Members: Users[]
}