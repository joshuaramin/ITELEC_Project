import { objectType } from "nexus";



export const UserObject = objectType({
    name: "user",
    definition(t) {
        t.id("userID");
        t.string("username");
        t.string("email");
        t.string("password");
        t.string("role");
        t.datetime("createdAt");
        t.datetime("updatedAt");
    },
})