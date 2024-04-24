import { extendType, idArg, nonNull } from "nexus";
import { prisma } from "../../../../helpers/services";




export const ChapterQuery = extendType({
    type: "Query",
    definition(t) {
        t.field("getLessonChapter", {
            type: "chapter",
            args: {
                chapterID: nonNull(idArg())
            },
            resolve: async (_, { chapterID }): Promise<any> => {
                return await prisma.chapter.findFirst({
                    where: {
                        chapterID
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                })
            }
        })
        t.list.field("getAllChapterByLessonID", {
            type: "chapter",
            args: { lessonID: nonNull(idArg()) },
            resolve: async (_, { lessonID }): Promise<any> => {
                return await prisma.chapter.findMany({
                    where: {
                        Lesson: {
                            lessonID
                        }
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                })
            }
        })
    }
})