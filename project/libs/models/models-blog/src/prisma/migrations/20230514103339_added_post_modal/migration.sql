-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('draft', 'posted');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('video', 'text', 'quote', 'image', 'link');

-- CreateTable
CREATE TABLE "posts" (
    "post_id" SERIAL NOT NULL,
    "status" "PostStatus" NOT NULL DEFAULT 'posted',
    "type" "PostType" NOT NULL,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "published_at" TIMESTAMP(3),

    CONSTRAINT "posts_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "postsVideo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "video" TEXT NOT NULL,

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

-- CreateTable
CREATE TABLE "comments" (
    "comment_id" SERIAL NOT NULL,
    "author_id" TEXT NOT NULL DEFAULT '',
    "post_id" INTEGER NOT NULL,
    "posted_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL DEFAULT '',
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PostToTag_AB_unique" ON "_PostToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");

-- AddForeignKey
ALTER TABLE "postsVideo" ADD CONSTRAINT "postsVideo_id_fkey" FOREIGN KEY ("id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postsText" ADD CONSTRAINT "postsText_id_fkey" FOREIGN KEY ("id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postsQuote" ADD CONSTRAINT "postsQuote_id_fkey" FOREIGN KEY ("id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postsPhoto" ADD CONSTRAINT "postsPhoto_id_fkey" FOREIGN KEY ("id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postsLink" ADD CONSTRAINT "postsLink_id_fkey" FOREIGN KEY ("id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
