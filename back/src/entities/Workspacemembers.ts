import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { Workspaces } from "./Workspaces";
import { Users } from "./Users";

@Index('UserId', ['UserId'], {})
@Entity('workspacemembers', { schema: 'chatapp' })
export class WorkspaceMembers {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('int', { primary: true, name: 'WorkspaceId' })
  WorkspaceId: number;

  @Column('int', { primary: true, name: 'UserId' })
  UserId: number;

  @Column('datetime', { name: 'loggedInAt', nullable: true })
  loggedInAt: Date | null;

  @ManyToOne(() => Users, (users) => users.WorkspaceMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{name: 'UserId', referencedColumnName: 'id'}])
  User: Users;
  
  //자 하나의 워크스페이스에는 여러 사람이 들어갈 수 있잖슴?
  @ManyToOne(() => Workspaces, (workspaces) => workspaces.WorkspaceMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'WorkspaceId', referencedColumnName: 'id'}])
  Workspace: Workspaces;

}