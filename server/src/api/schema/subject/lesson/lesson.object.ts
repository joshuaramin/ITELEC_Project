import { objectType } from "nexus";
import { prisma } from "../../../helpers/services";



export const LessonObject = objectType({
    name: "lesson",
    definition(t) {
        t.id("lessonID");
        t.string("lesson");
        t.int("assessmentCount", {
            resolve: async ({ lessonID }): Promise<any> => {
                return await prisma.assessment.count({
                    where: {
                        lessonID
                    }
                })
            }
        })
        t.int("chapterCount", {
            resolve: async ({ lessonID }): Promise<any> => {
                return await prisma.chapter.count({
                    where: {
                        lessonID
                    }
                })
            }
        })
        t.list.field("chapter", {
            type: "chapter",
            resolve: async ({ lessonID }): Promise<any> => {
                return await prisma.chapter.findMany({
                    where: {
                        Lesson: {
                            lessonID
                        }
                    }
                })
            }
        })
    },
})