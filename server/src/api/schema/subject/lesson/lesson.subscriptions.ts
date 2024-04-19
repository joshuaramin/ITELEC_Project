import { idArg, nonNull, subscriptionField } from "nexus";
import { pubsub } from "../../../helpers/services";


export const LessonSubscription = subscriptionField("NewlyCreatedSubjectLesson", {
    type: "lesson",
    args: { subjectID: nonNull(idArg()) },
    subscribe: async (): Promise<any> => {
        return await pubsub.asyncIterator("createdSubjectLesson")
    },
    resolve: async (paylaod): Promise<any> => {
        return await paylaod
    }
})