import {
    Body,
    Controller,
    Get,
    Post,
    UnauthorizedException
} from '@nestjs/common';
import {
    Model
} from 'mongoose';
import {
    InjectModel
} from '@nestjs/mongoose';
import {
    JWT_SECRET
} from '../constants';
import * as password from 'password-hash-and-salt';
import * as jwt from 'jsonwebtoken';

@Controller("api")
export class AuthController {

    constructor(
        @InjectModel("User") private userModel: Model) {}

    @Get('login')
    async getUsers(): Promise<any[]> {
        const users = await this.userModel.find().exec();
        console.log('get all users:\n' + users);
        return users;
    }

    @Post('login')
    async login(@Body("email") email: string,
        @Body("password") plaintextPassword: string) {

        const user = await this.userModel.findOne({ email });

        if (!user) {
            console.log(`User: ${email} does not exist in the database.`);
            throw new UnauthorizedException();
        } else {
            console.log(`User: ${email} is in the database.`);
        }

        return new Promise((resolve, reject) => {
            password(plaintextPassword).verifyAgainst(
                user.passwordHash,
                (err, verified) => {
                    if (!verified) {
                        reject(new UnauthorizedException());
                    }

                    const authJwtToken =
                        jwt.sign({ email, roles: user.roles },
                            JWT_SECRET);
                    // jwt.io
                    resolve({ authJwtToken });
                }
            );
        });

    }

}