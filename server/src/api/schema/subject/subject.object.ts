import { objectType } from "nexus";
import { prisma } from "../../helpers/services";



export const SubjectObject = objectType({
    name: "subject",
    definition(t) {
        t.id("subjectID");
        t.string("subject");
        t.string("tags");
        t.datetime("createdAt");
        t.datetime("updateAt");
        t.list.field("lessons", {
            type: "lesson",
            resolve: async ({ subjectID }): Promise<any> => {
                return await prisma.lesson.findMany({
                    where: {
                        subjectID
                    }
                })
            }
        })
    },
})