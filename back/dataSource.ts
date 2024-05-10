import dotenv from 'dotenv';
import { Users } from 'src/entities/Users';
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
    Users
    ],
    synchronize: true,
    logging: true
})

export default dataSource;
