import { extendType, idArg, inputObjectType, nonNull, stringArg } from "nexus";
import { prisma, pubsub } from "../../helpers/services";
import { uploader } from "../../helpers/cloudinary";
import { SubjectInterface } from "../../../interface";
import { GraphQLError } from "graphql";
export const SubjectInput = inputObjectType({
  name: "subjectInput",
  definition(t) {
    t.string("subject");
    t.string("description");
    t.string("language");
  },
});

export const SubjectMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createSubject", {
      type: "subject",
      args: {
        input: "subjectInput",
        file: nonNull("Upload"),
        userID: nonNull(idArg()),
        categoryID: nonNull(idArg()),
      },
      resolve: async (
        _,
        { input: { subject, description, language }, file, categoryID, userID }
      ): Promise<SubjectInterface> => {
        const { createReadStream, filename } = await file;

        if (!subject) throw new GraphQLError("Subject title is required");
        if (!description) throw new GraphQLError("Description is required");
        if (!language) throw new GraphQLError("Language is required");
        if (!file) throw new GraphQLError("File image is required");

        const newSubject = await prisma.subject.create({
          data: {
            subject,
            image: await uploader(createReadStream()),
            language,
            description,
            Category: {
              connect: {
                categoryID,
              },
            },
            User: {
              connect: {
                userID,
              },
            },
          },
        });

        pubsub.publish("createSubejctBUserId", newSubject);
        return newSubject;
      },
    });
    t.field("updateSubjectTitle", {
      type: "subject",
      args: { subject: nonNull(stringArg()), subjectID: nonNull(idArg()) },
      resolve: async (_, { subject, subjectID }): Promise<any> => {
        return await prisma.subject.update({
          data: { subject },
          where: { subjectID },
        });
      },
    });

    t.field("updateSubjectDescription", {
      type: "subject",
      args: { subjectID: nonNull(idArg()), description: nonNull(stringArg()) },
      resolve: async (_, { subjectID, description }): Promise<any> => {
        return await prisma.subject.update({
          where: { subjectID },
          data: { description },
        });
      },
    });

    t.field("deleteSubject", {
      type: "subject",
      args: { subjectID: nonNull(idArg()) },
      resolve: async (_, { subjectID }): Promise<any> => {
        return await prisma.subject.delete({
          where: {
            subjectID,
          },
        });
      },
    });
  },
});
