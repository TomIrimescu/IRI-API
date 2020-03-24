
import {
    Module
} from '@nestjs/common';
import {
    AuthController
} from './auth.controller';
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
        AuthController
    ]
})
export class AuthModule {

}