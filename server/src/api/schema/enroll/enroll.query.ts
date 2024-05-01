import { extendType, idArg, nonNull, stringArg } from "nexus";
import { prisma } from "../../helpers/services";

export const EnrollQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getEnrollendById", {
      type: "enroll",
      args: { enrollID: nonNull(idArg()) },
      resolve: async (_, { enrollID }): Promise<any> => {
        return await prisma.enroll.findFirst({
          where: { enrollID },
        });
      },
    });
    t.boolean("getEnrolledSubjectByIDs", {
      args: { subjectID: nonNull(idArg()), userID: nonNull(idArg()) },
      resolve: async (_, { subjectID, userID }): Promise<any> => {
        const data = await prisma.enroll.findFirst({
          where: {
            subjectID,
            userID,
          },
          include: {
            User: true,
          },
        });

        if (data) {
          return true;
        } else {
          return false;
        }
      },
    });
    t.list.field("getAllMyEnrolledSubject", {
      type: "enroll",
      args: { userID: nonNull(idArg()), orderBys: nonNull(stringArg()) },
      resolve: async (_, { userID, orderBys }): Promise<any> => {
        return await prisma.enroll.findMany({
          where: {
            User: {
              userID,
            },
          },
          orderBy: {
            createdAt: orderBys as any,
          },
          include: {
            Subject: true,
            User: true,
          },
        });
      },
    });
  },
});
