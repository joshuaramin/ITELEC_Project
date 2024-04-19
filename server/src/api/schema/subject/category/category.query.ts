import { extendType } from "nexus";
import { prisma } from "../../../helpers/services";



export const CategoryQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getAllCategory", {
            type: "category",
            resolve: async (): Promise<any> => {
                return await prisma.category.findMany()
            }
        })
    },
})