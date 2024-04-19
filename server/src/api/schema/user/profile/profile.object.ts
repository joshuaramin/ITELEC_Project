import { objectType } from "nexus";
import { prisma } from "../../../helpers/services";



export const ProfileObject = objectType({
    name: "profile",
    definition(t) {
        t.id("profileID");
        t.string("fullname");
        t.date("birthday");
        t.phone("phone");
        t.string("bio");
        t.datetime("createdAt");
        t.string("updatedAt");
        t.field("user", {
            type: "user",
            resolve: async ({ profileID }): Promise<any> => {
                return await prisma.user.findFirst({
                    where: {
                        Profile: {
                            profileID
                        }
                    }
                })
            }
        })
    },
})