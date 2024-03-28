-- CreateEnum
CREATE TYPE "role" AS ENUM ('admin', 'professor', 'student');

-- CreateEnum
CREATE TYPE "EnrollStatus" AS ENUM ('Enrolled', 'Drop');

-- CreateTable
CREATE TABLE "User" (
    "userID" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "role" NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Profile" (
    "profileID" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "birthday" DATE NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userID" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("profileID")
);

-- CreateTable
CREATE TABLE "Enroll" (
    "enrollID" TEXT NOT NULL,
    "status" "EnrollStatus" NOT NULL DEFAULT 'Enrolled',
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userID" TEXT,
    "subjectID" TEXT,

    CONSTRAINT "Enroll_pkey" PRIMARY KEY ("enrollID")
);

-- CreateTable
CREATE TABLE "Subject" (
    "subjectID" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userID" TEXT,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("subjectID")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "lessonID" TEXT NOT NULL,
    "lesson" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subjectID" TEXT,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("lessonID")
);

-- CreateTable
CREATE TABLE "Assessment" (
    "assessmentID" TEXT NOT NULL,
    "assessment" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lessonID" TEXT,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("assessmentID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userID_key" ON "Profile"("userID");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enroll" ADD CONSTRAINT "Enroll_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enroll" ADD CONSTRAINT "Enroll_subjectID_fkey" FOREIGN KEY ("subjectID") REFERENCES "Subject"("subjectID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_subjectID_fkey" FOREIGN KEY ("subjectID") REFERENCES "Subject"("subjectID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_lessonID_fkey" FOREIGN KEY ("lessonID") REFERENCES "Lesson"("lessonID") ON DELETE SET NULL ON UPDATE CASCADE;
