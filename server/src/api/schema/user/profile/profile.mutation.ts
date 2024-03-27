import { extendType, idArg, inputObjectType, nonNull, stringArg } from "nexus";
import { prisma } from "../../../helpers/services";



export const Profileinput = inputObjectType({
    name: "profileInput",
    definition(t) {
        t.id("profileID")
        t.string("fullname");
        t.date("birthday");
        t.phone("phone")
    }
})

export const ProfileMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("updateUserProfile", {
            type: "profile",
            args: { input: "profileInput" },
            resolve: async (_, { input: { profileID, fullname, birthday, phone } }): Promise<any> => {
                return await prisma.profile.update({
                    where: { profileID },
                    data: {
                        fullname, birthday, phone
                    }
                })
            }
        })
    }
})