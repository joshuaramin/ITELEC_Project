import { extendType, idArg, nonNull } from "nexus";
import { prisma } from "../../helpers/services";



export const EnrollQuery = extendType({
    type: "Query",
    definition(t) {
        t.field("getEnrollendById", {
            type: "enroll",
            args: { enrollID: nonNull(idArg()) },
            resolve: async (_, { enrollID }): Promise<any> => {
                return await prisma.enroll.findFirst({
                    where: { enrollID }
                })
            }
        })
    }
})