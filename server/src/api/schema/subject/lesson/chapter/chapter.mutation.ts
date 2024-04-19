import { extendType, idArg, nonNull, stringArg } from "nexus";
import { prisma } from "../../../../helpers/services";



export const ChapterMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createLessonChapter", {
            type: "chapter",
            args: { chapter: nonNull(stringArg()), content: nonNull(stringArg()), lessonID: nonNull(idArg()) },
            resolve: async (_, { chapter, content, lessonID }): Promise<any> => {
                return await prisma.chapter.create({
                    data: {
                        chapter, content,
                        status: "reading",
                        Lesson: {
                            connect: {
                                lessonID
                            }
                        }
                    }
                })
            }
        })
        t.field("updateLessonChapter", {
            type: "chapter",
            args: { chapter: nonNull(stringArg()), content: nonNull(stringArg()), chapterID: nonNull(idArg()) },
            resolve: async (_, { chapter, content, chapterID }): Promise<any> => {
                return await prisma.chapter.update({
                    where: {
                        chapterID
                    },
                    data: {
                        chapter, content
                    }
                })
            }
        })
    }
})