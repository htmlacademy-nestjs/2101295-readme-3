-- DropForeignKey
ALTER TABLE "postsLink" DROP CONSTRAINT "postsLink_id_fkey";

-- DropForeignKey
ALTER TABLE "postsPhoto" DROP CONSTRAINT "postsPhoto_id_fkey";

-- DropForeignKey
ALTER TABLE "postsQuote" DROP CONSTRAINT "postsQuote_id_fkey";

-- DropForeignKey
ALTER TABLE "postsText" DROP CONSTRAINT "postsText_id_fkey";

-- DropForeignKey
ALTER TABLE "postsVideo" DROP CONSTRAINT "postsVideo_id_fkey";

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
