import { extendType, idArg, nonNull, stringArg } from "nexus";
import { prisma, pubsub } from "../../../../helpers/services";
import { GraphQLError } from "graphql";

export const ChapterMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createLessonChapter", {
      type: "chapter",
      args: {
        chapter: nonNull(stringArg()),
        content: nonNull(stringArg()),
        lessonID: nonNull(idArg()),
      },
      resolve: async (_, { chapter, content, lessonID }): Promise<any> => {
        if (!chapter) throw new GraphQLError("Chatper title is required");
        if (!content) throw new GraphQLError("Content Chatper is requried");
        const chapterLesson = await prisma.chapter.create({
          data: {
            chapter,
            content,
            status: "reading",
            Lesson: {
              connect: {
                lessonID,
              },
            },
          },
        });

        pubsub.publish("createChapterLesson", chapterLesson);

        return chapterLesson;
      },
    });
    t.field("updateLessonChapter", {
      type: "chapter",
      args: {
        chapter: nonNull(stringArg()),
        content: nonNull(stringArg()),
        chapterID: nonNull(idArg()),
      },
      resolve: async (_, { chapter, content, chapterID }): Promise<any> => {
        return await prisma.chapter.update({
          where: {
            chapterID,
          },
          data: {
            chapter,
            content,
          },
        });
      },
    });
    t.field("deleteLessonChapter", {
      type: "chapter",
      args: { chapterID: nonNull(idArg()) },
      resolve: async (_, { chapterID }): Promise<any> => {
        return await prisma.chapter.delete({
          where: {
            chapterID,
          },
        });
      },
    });
  },
});
