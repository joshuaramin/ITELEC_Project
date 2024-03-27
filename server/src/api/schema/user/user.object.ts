import { objectType } from "nexus";
import { prisma } from "../../helpers/services";



export const UserObject = objectType({
    name: "user",
    definition(t) {
        t.id("userID");
        t.string("username");
        t.string("email");
        t.string("password");
        t.string("role");
        t.datetime("createdAt");
        t.datetime("updatedAt");
        t.field("profile", {
            type: "profile",
            resolve: async ({ userID }): Promise<any> => {
                return await prisma.profile.findFirst({
                    where: {
                        userID
                    }
                })
            }
        })
    },
})