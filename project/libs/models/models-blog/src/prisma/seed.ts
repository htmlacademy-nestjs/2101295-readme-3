import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const fakeAuthorId = 'fakeAuthorId';

async function fillDb() {
  await prisma.post.upsert({
    where: { postId: 1 },
    update: {},
    create: {
      type: "image",
      userId: fakeAuthorId,
      postPhoto: {
        create: {
          photo: 'string'
        }
      }
    },
  });
  await prisma.post.upsert({
    where: { postId: 2 },
    update: {},
    create: {
      type: "link",
      userId: fakeAuthorId,
      postLink: {
        create: {
          link: 'https://google.com',
        },
      },
    },
  });
  await prisma.post.upsert({
    where: { postId: 3 },
    update: {},
    create: {
      type: 'text',
      userId: fakeAuthorId,
      postText: {
        create: {
          anonce: 'Announce text',
          text: 'Full text',
          title: 'Post name',
        },
      },
    },
  });
  await prisma.post.upsert({
    where: { postId: 4 },
    update: {},
    create: {
      type: 'video',
      userId: fakeAuthorId,
      postVideo: {
        create: {
          video: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
          title: 'Funny video',
          link: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
        },
      },
    },
  });
  await prisma.post.upsert({
    where: { postId: 5 },
    update: {},
    create: {
      type: 'quote',
      userId: fakeAuthorId,
      postQuote: {
        create: {
          author: 'John Doe',
          quote: 'Text',
        },
      },
    },
  });
  console.info('🤘️ Database was filled');
}

fillDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();

    process.exit(1);
  });
