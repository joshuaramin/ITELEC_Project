import { extendType, idArg, nonNull, stringArg } from "nexus";
import { prisma } from "../../../helpers/services";



export const CategoryMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createSubjectCategory", {
            type: "category",
            args: { category: nonNull(stringArg()) },
            resolve: async (_, { category }): Promise<any> => {
                return await prisma.category.create({
                    data: {
                        category
                    }
                })
            }
        })
        t.field("deleteSubjectCategory", {
            type: "category",
            args: { categoryID: nonNull(idArg()) },
            resolve: async (_, { categoryID }): Promise<any> => {
                return await prisma.category.delete({
                    where: {
                        categoryID
                    }
                })
            }
        })
    },
})