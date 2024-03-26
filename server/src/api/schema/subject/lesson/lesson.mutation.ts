import { extendType, idArg, list, nonNull, stringArg } from "nexus";
import { prisma } from "../../../helpers/services";



export const LessonMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createSubjectLesson", {
            type: "lesson",
            args: { lesson: nonNull(stringArg()), subjectID: nonNull(idArg()) },
            resolve: async (_, { lesson, subjectID }): Promise<any> => {
                return await prisma.lesson.create({
                    data: {
                        lesson,
                        Subject: {
                            connect: {
                                subjectID
                            }
                        }
                    },
                })
            }
        })
        t.field("updateSubjectLesson", {
            type: "lesson",
            args: { lessonID: nonNull(idArg()), lesson: nonNull(stringArg()) },
            resolve: async (_, { lessonID, lesson }): Promise<any> => {
                return await prisma.lesson.update({
                    data: { lesson },
                    where: {
                        lessonID
                    }
                })
            }
        })
    },
})