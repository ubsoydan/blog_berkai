import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PostFrontMatter } from 'types/PostFrontMatter'
import NewsletterForm from '@/components/NewsletterForm'
import Image from 'next/image'

const MAX_DISPLAY = 5

export const getStaticProps: GetStaticProps<{ posts: PostFrontMatter[] }> = async () => {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className=" divide-gray-200 dark:divide-gray-700">
        <div className="grid grid-cols-1 space-y-10 py-4 sm:space-y-5 sm:py-24 xl:grid-cols-5">
          <div className="col-span-3 justify-center space-y-5 align-middle">
            <span className="relative inset-y-4 ml-20 inline-block px-1 before:absolute before:-inset-1 before:block before:-skew-y-6 before:bg-primary-500 before:bg-opacity-20 sm:hidden">
              <span className="relative inline-block -rotate-6 text-primary-500">
                <Link
                  href="https://twitter.com/reubence_"
                  className="font-arrow2 text-sm font-bold text-primary-500 transition hover:underline hover:underline-offset-8"
                >
                  @reubence
                </Link>
              </span>
            </span>{' '}
            <h1 className="text-4xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl sm:leading-10 md:text-[46px] md:leading-snug">
              Reuben
              <span className="relative mx-3 hidden before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-primary-500 before:bg-opacity-20 sm:inline-block">
                <span className="relative skew-y-3 text-primary-500">
                  <Link
                    href="https://twitter.com/reubence_"
                    className="text-primary-500 transition hover:underline hover:underline-offset-8"
                  >
                    @reubence
                  </Link>
                </span>
              </span>
              <span className="relative inset-y-6 ml-2 inline-block -rotate-12 font-arrow text-primary-500 sm:hidden">
                ^
              </span>
              Rapose
            </h1>
            <p className="text-lg leading-7 text-black dark:text-white sm:pr-6 sm:text-xl">
              Welcome to my Digital Garden – I am a <span className="">Data Scientist</span> by
              training and <span className="">Full-Stack Developer</span> by profession. In my free
              time, I like developing{' '}
              <Link
                href="/projects"
                className="text-black underline decoration-primary-500 underline-offset-4 hover:cursor-pointer hover:text-primary-500 dark:text-white hover:dark:text-primary-500"
              >
                <a>side projects</a>
              </Link>{' '}
              and{' '}
              <Link href="/blog">
                <a className="text-black underline decoration-primary-500 underline-offset-4 hover:cursor-pointer hover:text-primary-500 dark:text-white hover:dark:text-primary-500">
                  blogging
                </a>
              </Link>{' '}
              about my journey as an Entrepreneur. Have a good read!{' '}
              <span className="waving-hand text-2xl">👋🏻</span>
            </p>
            <p className="text-lg leading-7 text-gray-500 underline underline-offset-4 sm:pr-6 sm:text-xl">
              <Link
                href="/about"
                className="hover:cursor-pointer hover:text-primary-500 dark:text-gray-500 hover:dark:text-primary-500"
              >
                <a>More on About Page</a>
              </Link>
            </p>
          </div>
          {siteMetadata.newsletter.provider !== '' && (
            <div className="col-span-2 flex xl:items-center xl:justify-center xl:pl-6">
              <NewsletterForm />
            </div>
          )}
        </div>

        <ul className="mt-10 divide-y divide-gray-200 dark:divide-gray-700">
          <h1 className="pb-2 text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-5xl md:leading-snug">
            Latest{' '}
          </h1>
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl className="">
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-lg font-medium leading-6 text-gray-500 dark:text-gray-400 sm:text-xl">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap pt-2">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose prose-lg max-w-none text-gray-500 dark:text-gray-400 sm:prose-xl">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
