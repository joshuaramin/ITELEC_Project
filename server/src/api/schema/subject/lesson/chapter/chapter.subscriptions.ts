import { idArg, nonNull, subscriptionField } from "nexus";
import { pubsub } from "../../../../helpers/services";



export const NewlyChapterSubscription = subscriptionField("NewlyLessonChapterSubscription", {
    type: "chapter",
    args: { lessonID: nonNull(idArg())},
    subscribe: async(): Promise<any> => {
        return await pubsub.asyncIterator("createChapterLesson")
    },
    resolve :async(payload): Promise<any> => {
        return await payload
    }
})