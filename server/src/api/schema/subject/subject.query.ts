import { extendType, idArg, intArg, nonNull, stringArg } from "nexus";
import { prisma } from "../../helpers/services";
import { SubjectInterface } from "../../../interface";
import { GraphQLError } from "graphql";

export const SubjectQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getAllSubject", {
      type: "subject",
      args: { take: nonNull(intArg()), skip: nonNull(intArg()) },
      resolve: async (_, { take, skip }): Promise<any> => {
        return await prisma.subject.findMany({
          take,
          skip,
        });
      },
    });
    t.list.field("getMySubjectCreated", {
      type: "subject",
      args: { userID: nonNull(idArg()) },
      resolve: async (_, { userID }): Promise<any> => {
        return await prisma.subject.findMany({
          where: {
            User: {
              Subject: {
                some: {
                  userID,
                },
              },
            },
          },
        });
      },
    });
    t.field("getSubjectById", {
      type: "subject",
      args: { subjectID: nonNull(idArg()) },
      resolve: async (_, { subjectID }): Promise<any> => {
        return await prisma.subject.findFirst({
          where: { subjectID },
        });
      },
    });
    t.list.field("getMySubjectSearch", {
      type: "subject",
      args: { search: nonNull(stringArg()), userID: nonNull(idArg()) },
      resolve: async (_, { search, userID }): Promise<any> => {
        const subject = await prisma.subject.findMany({
          where: {
            User: {
              userID,
            },
            subject: {
              contains: search,
              mode: "insensitive",
            },
          },
        });

        return subject;
      },
    });
    t.list.field("getSubjectBySearch", {
      type: "subject",
      args: { search: nonNull(stringArg()) },
      resolve: async (_, { search }): Promise<any> => {
        const subject = await prisma.subject.findMany({
          where: {
            subject: {
              contains: search,
              mode: "insensitive",
            },
          },
        });

        if (subject.length < 0) throw new GraphQLError("No Subject");

        return subject;
      },
    });
  },
});
