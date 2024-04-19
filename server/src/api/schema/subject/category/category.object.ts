import { objectType } from "nexus";
import { prisma } from "../../../helpers/services";



export const CategoryObject = objectType({
    name: "category",
    definition(t) {
        t.id("categoryID");
        t.string("category");
        t.list.field("subject", {
            type: "subject",
            resolve: async ({ categoryID }): Promise<any> => {
                return await prisma.subject.findMany({
                    where: {
                        categoryID
                    }
                })
            }
        })
    },
})