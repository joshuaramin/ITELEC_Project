import { objectType } from "nexus";



export const EnrollObject = objectType({
    name: "enroll",
    definition(t) {
        t.id("enrollID");
        t.string("status");
        t.datetime("createdAt");
        t.datetime("updatedAt");
    }
})