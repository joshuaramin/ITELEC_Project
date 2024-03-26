import { enumType, extendType, idArg, intArg, nonNull } from "nexus";
import { prisma } from "../../helpers/services";


export const UserEnum = enumType({
    name: "userRoles",
    members: [ "admin", "professor", "student" ]
})


export const UserQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getAllUserByRole", {
            type: "user",
            args: { take: nonNull(intArg()), skip: nonNull(intArg()), role: "userRoles" },
            resolve: async (_, { role, skip, take }): Promise<any> => {
                return await prisma.user.findMany({
                    where: {
                        role
                    },
                    take,
                    skip
                })
            }
        })
        t.list.field("getUserById", {
            type: "user",
            args: { userID: nonNull(idArg()) },
            resolve: async (_, { userID }): Promise<any> => {
                return await prisma.user.findMany({
                    where: {
                        userID
                    }
                })
            }
        })
    },
})