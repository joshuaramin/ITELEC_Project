import { extendType } from "nexus";
import { prisma } from "../../../helpers/services";



export const LessonQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getAllLesson", {
            type: "lesson",
            resolve: async (): Promise<any> => {
                return await prisma.lesson.findMany()
            }
        })
    },
})