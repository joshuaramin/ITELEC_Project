import { objectType } from "nexus";
import { prisma } from "../../helpers/services";

export const EnrollObject = objectType({
    name: "enroll",
    definition(t) {
        t.id("enrollID");
        t.string("status");
        t.datetime("createdAt");
        t.datetime("updatedAt");
        t.field("subject", {
            type: "subject",
            resolve: async ({ enrollID }): Promise<any> => {
                return await prisma.subject.findMany({
                    where: {
                        Enroll: {
                            some: {
                                enrollID
                            }
                        }
                    }
                })
            }
        })
        t.field("user", {
            type: "user",
            resolve: async ({ enrollID }): Promise<any> => {
                return await prisma.user.findMany({
                    where: {
                        Enroll: {
                            some: {
                                enrollID
                            }
                        }
                    }
                })
            }
        })
    }
})