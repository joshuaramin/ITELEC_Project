import { extendType, idArg, intArg, nonNull, stringArg } from "nexus";
import { prisma } from "../../helpers/services";
import { SubjectInterface } from "../../../interface";



export const SubjectQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getAllSubject", {
            type: "subject",
            args: { take: nonNull(intArg()), skip: nonNull(intArg()) },
            resolve: async (_, { take, skip }): Promise<any> => {
                return await prisma.subject.findMany({
                    take, skip
                })
            }
        })
        t.field("getSubjectTags", {
            type: "subject",
            args: { tags: nonNull(stringArg()) },
            resolve: async (_, { tags }): Promise<any> => {
                return await prisma.subject.findMany({
                    where: {
                        tags
                    }
                })
            }
        })
        t.field("getSubejectById", {
            type: "subject",
            args: { subjectID: nonNull(idArg()) },
            resolve: async (_, { subjectID }): Promise<any> => {
                return await prisma.subject.findFirst({
                    where: { subjectID }
                })
            }
        })
        t.list.field("getSubjectBySearch", {
            type: "subject",
            args: { search: nonNull(stringArg()) },
            resolve: async (_, { search }): Promise<any> => {
                return await prisma.subject.findMany({
                    where: {
                        subject: {
                            contains: search,
                            mode: "insensitive"
                        }
                    }
                })
            }
        })
    }
})