import { extendType, idArg, nonNull, stringArg } from "nexus";
import { prisma } from "../../helpers/services";



export const SubjectMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createSubject", {
            type: "subject",
            args: { subject: nonNull(stringArg()), tags: nonNull(stringArg()) },
            resolve: async (_, { subject, tags }): Promise<any> => {
                return await prisma.subject.create({
                    data: {
                        subject, tags
                    }
                })
            }
        })
        t.field("updateSubject", {
            type: "subject",
            args: { subject: nonNull(stringArg()), subjectID: nonNull(idArg()) },
            resolve: async (_, { subject, subjectID }): Promise<any> => {
                return await prisma.subject.update({
                    data: { subject },
                    where: { subjectID }
                })
            }
        })
        t.field("updatSubjectTags", {
            type: "subject",
            args: { tags: nonNull(stringArg()), subjectID: nonNull(idArg()) },
            resolve: async (_, { tags, subjectID }): Promise<any> => {
                return await prisma.subject.update({
                    data: { tags }, where: { subjectID }
                })
            }
        })
        t.field("deleteSubject", {
            type: "subject",
            args: { subjectID: nonNull(idArg()) },
            resolve: async (_, { subjectID }): Promise<any> => {
                return await prisma.subject.delete({
                    where: {
                        subjectID
                    }
                })
            }
        })
    },
})