import { extendType } from "nexus";
import { prisma } from "../../helpers/services";



export const SubjectQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getAllSubjectList", {
            type: "subject",
            resolve: async (): Promise<any> => {
                return await prisma.subject.findMany()
            }
        })
    },
})