import { objectType } from "nexus";



export const ChapterObject = objectType({
    name: "chapter",
    definition(t) {
        t.id("chapterID");
        t.string("chapter");
        t.string("content");
        t.string("status");
        t.datetime("createdAt");
        t.datetime("updatedAt");
    },
})