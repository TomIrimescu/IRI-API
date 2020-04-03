import {
    Body,
    Controller,
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

    @Post('login')
    async login(@Body("email") email: string,
        @Body("password") plaintextPassword: string) {

        const user = await this.userModel.findOne({ email });

        if (!user) {
            console.log(`User: does not exist in the database.`);
            throw new UnauthorizedException();
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

                    resolve({ authJwtToken });
                }
            );
        });

    }

}