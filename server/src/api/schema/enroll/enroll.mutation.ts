import { extendType, idArg, nonNull } from "nexus";
import { prisma } from "../../helpers/services";



export const Enrollmutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createSubjectEnroll", {
            type: "enroll",
            args: { userID: nonNull(idArg()), subjectID: nonNull(idArg()) },
            resolve: async (_, { userID, subjectID }): Promise<any> => {
                return await prisma.enroll.create({
                    data: {
                        status: "Enrolled",
                        Subject: {
                            connect: {
                                subjectID
                            }
                        },
                        User: {
                            connect: {
                                userID
                            }
                        }
                    }
                })
            }
        })
    }
})