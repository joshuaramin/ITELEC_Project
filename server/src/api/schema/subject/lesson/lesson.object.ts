import { objectType } from "nexus";



export const LessonObject = objectType({
    name: "lesson",
    definition(t) {
        t.id("lessonID");
        t.string("lesson");
        t.list.string("tags");
    },
})