import { extendType, idArg, nonNull, subscriptionField } from "nexus";
import { prisma, pubsub } from "../../helpers/services";



export const SubjectQuery = subscriptionField("NewlySubjectCreatedByUser", {
    type: "subject",
    args: { userID: nonNull(idArg()) },
    subscribe: async (): Promise<any> => {
        return pubsub.asyncIterator("createSubejctBUserId")
    },
    resolve: async (payload): Promise<any> => {
        return await payload
    }
})