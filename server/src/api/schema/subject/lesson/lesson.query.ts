import { extendType, idArg, nonNull } from "nexus";
import { prisma } from "../../../helpers/services";



export const LessonQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getAllSubjectLesson", {
            type: "lesson",
            args: { subjectID: nonNull(idArg()) },
            resolve: async (_, { subjectID }): Promise<any> => {
                return await prisma.lesson.findMany({
                    where: {
                        subjectID
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                })
            }
        })
        t.field("getSubjectLessonID", {
            type: "lesson",
            args: { lessonID: nonNull(idArg()) },
            resolve: async (_, { lessonID }): Promise<any> => {
                return await prisma.lesson.findFirst({
                    where: {
                        lessonID
                    }
                })
            }
        })
    },
})