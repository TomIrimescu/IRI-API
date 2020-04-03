
import {
    Module
} from '@nestjs/common';
import { 
    LoginController 
} from './login.controller';
import {
    MongooseModule
} from '@nestjs/mongoose';
import {
    UsersSchema
} from '../auth/schema/users.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: "User", schema: UsersSchema
            }
        ])
    ],
    controllers: [
        LoginController
    ]
})
export class AuthModule {}