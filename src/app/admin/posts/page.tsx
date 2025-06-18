import prisma from '@/app/lib/prisma'
import { PostTable } from './components/post-table'

export default async function PostsPage() {
  const posts = await prisma.blogPost.findMany({
    include: { author: { select: { name: true } } },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <PostTable posts={posts} />
    </div>
  )
}