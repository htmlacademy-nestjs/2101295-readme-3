/*
  Warnings:

  - You are about to drop the `PostLink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostPhoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostQuote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostText` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostVideo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostLink" DROP CONSTRAINT "PostLink_id_fkey";

-- DropForeignKey
ALTER TABLE "PostPhoto" DROP CONSTRAINT "PostPhoto_id_fkey";

-- DropForeignKey
ALTER TABLE "PostQuote" DROP CONSTRAINT "PostQuote_id_fkey";

-- DropForeignKey
ALTER TABLE "PostText" DROP CONSTRAINT "PostText_id_fkey";

-- DropForeignKey
ALTER TABLE "PostVideo" DROP CONSTRAINT "PostVideo_id_fkey";

-- DropTable
DROP TABLE "PostLink";

-- DropTable
DROP TABLE "PostPhoto";

-- DropTable
DROP TABLE "PostQuote";

-- DropTable
DROP TABLE "PostText";

-- DropTable
DROP TABLE "PostVideo";

-- CreateTable
CREATE TABLE "postsVideo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "postsVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postsText" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "anonce" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "postsText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postsQuote" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "quote" TEXT NOT NULL,

    CONSTRAINT "postsQuote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postsPhoto" (
    "id" SERIAL NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "postsPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postsLink" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "discription" TEXT,

    CONSTRAINT "postsLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "postsVideo" ADD CONSTRAINT "postsVideo_id_fkey" FOREIGN KEY ("id") REFERENCES "posts"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postsText" ADD CONSTRAINT "postsText_id_fkey" FOREIGN KEY ("id") REFERENCES "posts"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postsQuote" ADD CONSTRAINT "postsQuote_id_fkey" FOREIGN KEY ("id") REFERENCES "posts"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postsPhoto" ADD CONSTRAINT "postsPhoto_id_fkey" FOREIGN KEY ("id") REFERENCES "posts"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postsLink" ADD CONSTRAINT "postsLink_id_fkey" FOREIGN KEY ("id") REFERENCES "posts"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;
