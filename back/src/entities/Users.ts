import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ChannelMembers } from "./Channelmembers";
import { WorkspaceMembers } from "./Workspacemembers";
import { Workspaces } from "./Workspaces";
import { Channels } from "./Channels";
import { ChannelChats } from "./ChannelChats";

@Index('email', ['email'], {unique: true})
@Entity({ schema: 'chatapp', name: 'users' })
export class Users {

    @PrimaryGeneratedColumn({type: 'int', name: 'id'})
    id: number;

    @Column('varchar', {name: 'email', unique: true, length: 30})
    email: string;

    @Column('varchar', {name: 'password', length: 100})
    password: string;

    @Column('varchar', {name: 'nickname', length: 100})
    nickname: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @OneToMany(() => ChannelChats, (channelchats) => channelchats.User)
    ChannelChats: ChannelChats[];

    @OneToMany(() => ChannelMembers, (channelMembers) => channelMembers.User)
    ChannelMembers: ChannelMembers[];

    @OneToMany(() => WorkspaceMembers, (WorkspaceMembers) => WorkspaceMembers.User)
    WorkspaceMembers: WorkspaceMembers[]

    @ManyToMany(() => Workspaces, (workspaces) => workspaces.Members)
    @JoinTable({
        name: 'workspacemembers',
        joinColumn: {
            name: 'UserId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'WorkspaceId',
            referencedColumnName: 'id',
        },
    })
    Workspaces: Workspaces[];

    @ManyToMany(() => Channels, (channels) => channels.Members)
    @JoinTable({
        name: 'channelmembers',
        joinColumn: {
            name: 'UserId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'ChannelId',
            referencedColumnName: 'id',
        },
    })
    Channels: Channels[];
}