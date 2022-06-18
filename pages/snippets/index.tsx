import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import SnippetsLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { ComponentProps } from 'react'

export const POSTS_PER_PAGE = 5

export const getStaticProps: GetStaticProps<{
  posts: ComponentProps<typeof SnippetsLayout>['posts']
  initialDisplayPosts: ComponentProps<typeof SnippetsLayout>['initialDisplayPosts']
  pagination: ComponentProps<typeof SnippetsLayout>['pagination']
}> = async () => {
  const posts = await getAllFilesFrontMatter('blog')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

export default function Blog({
  posts,
  initialDisplayPosts,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <SnippetsLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}
