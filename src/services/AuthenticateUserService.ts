import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UserRepositories } from "../repositories/UserRepositories";

interface IAuthenticateRequest{
    email: string;
    password: string;
}

export class AuthenticateUserService {
    async execute({email, password}: IAuthenticateRequest) {

        const usersRepositories = getCustomRepository(UserRepositories)

        const user = await usersRepositories.findOne({email})

        if(!user){
            throw new Error('Email/Password incorrect')
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error('Email/Password incorrect')
        }

        const token = sign({
            email: user.email
        }, '1a6614d527762ac31488913ad7ff8cbb', {
            subject: user.id,
            expiresIn: '1d'
        })

        return token
    }
}