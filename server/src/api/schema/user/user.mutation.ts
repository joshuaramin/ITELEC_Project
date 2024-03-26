import { extendType, idArg, inputObjectType, nonNull, stringArg } from "nexus";
import { prisma } from "../../helpers/services";
import { sign } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Token, UserInterface } from "../../../interface";
import { GraphQLError } from "graphql";


export const UserInput = inputObjectType({
    name: "userInput",
    definition(t) {
        t.string("email");
        t.string("password");
        t.string("username");
        t.string("fullname");
        t.phone("phone");
        t.date("birthday")
    },
})

export const UserMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createUserAccount", {
            type: "user",
            args: { user: "userInput", role: "userRoles" },
            resolve: async (_, { user: { email, password, username, fullname, phone, birthday }, role }): Promise<UserInterface> => {
                const pass = await bcrypt.hash(password, 12)
                return await prisma.user.create({
                    data: {
                        email,
                        password: pass, role,
                        username, Profile: {
                            create: {
                                fullname,
                                phone,
                                birthday,
                            }
                        }
                    }
                })
            }
        })

        t.field("deleteUserAccount", {
            type: "user",
            args: { userID: nonNull(idArg()) },
            resolve: async (_, { userID }): Promise<UserInterface> => {
                return await prisma.user.delete({
                    where: {
                        userID
                    }
                })
            }
        })
        t.field("login", {
            type: "user",
            args: { username: nonNull(stringArg()), password: nonNull(stringArg()) },
            resolve: async (_, { username, password }, { res }): Promise<Token> => {


                const users = await prisma.user.findUnique({
                    where: {
                        username
                    }
                })

                if (!users) throw new GraphQLError("Username does not exist. Try again");


                const validPass = await bcrypt.compare(password, users.password);

                if (!validPass) throw new GraphQLError("Password is incorrect. Try again");

                const token = sign({ userID: users.userID }, "itelec", {
                    algorithm: "HS256",
                    expiresIn: 60 * 60 * 7 * 24
                })

                res.cookies("access_token", token)

                return { token }
            }
        })
    },
})