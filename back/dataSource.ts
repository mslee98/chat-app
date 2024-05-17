import dotenv from 'dotenv';
import { ChannelMembers } from 'src/entities/Channelmembers';
import { Channels } from 'src/entities/Channels';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/Workspacemembers';
import { Workspaces } from 'src/entities/Workspaces';
import { DataSource } from 'typeorm';


dotenv.config()

const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'chatapp',
    entities: [
    Users,
    Workspaces,
    WorkspaceMembers,
    Channels,
    ChannelMembers
    ],
    synchronize: true,
    logging: true
})

export default dataSource;
