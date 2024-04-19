import { objectType } from "nexus";
import { prisma } from "../../helpers/services";



export const SubjectObject = objectType({
    name: "subject",
    definition(t) {
        t.id("subjectID");
        t.string("subject");
        t.string("tags");
        t.string("image");
        t.string("language");
        t.string("description");
        t.datetime("createdAt");
        t.datetime("updatedAt");
        t.int("lessonCount", {
            resolve: async ({ subjectID }): Promise<any> => {
                return await prisma.lesson.count({
                    where: {
                        subjectID
                    }
                })
            }
        })

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
        t.field("user", {
            type: "user",
            resolve: async ({ subjectID }): Promise<any> => {
                return await prisma.user.findFirst({
                    where: {
                        Subject: {
                            some: {
                                subjectID
                            }
                        }
                    }
                })
            }
        })
        t.list.field("enrolled", {
            type: "enroll",
            resolve: async ({ subjectID }): Promise<any> => {
                return await prisma.enroll.findMany({
                    where: {
                        subjectID
                    }
                })
            }
        })
    },
})