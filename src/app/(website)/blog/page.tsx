import Link from 'next/link';
import { notFound } from 'next/navigation';
import payload from 'payload';
import Image from 'next/image';
import { format } from 'date-fns';

export const metadata = {
  title: 'Blog',
  description: 'Latest posts and updates',
};

// Define types for posts
interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  image?: {
    url: string;
    alt: string;
  };
  publishedDate: string;
  author: {
    id: string;
    name: string;
  };
  tags?: Array<{
    id: string;
    name: string;
  }>;
}

// Number of posts per page
const POSTS_PER_PAGE = 9;

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1;

  try {
    // Fetch posts using PayloadCMS local API
    const postsResponse = await payload.find({
      collection: 'posts',
      // where: {
      //   status: {
      //     equals: 'published',
      //   },
      // },
      sort: '-publishedDate',
      limit: POSTS_PER_PAGE,
      page: page,
      depth: 1, // Resolve relationships one level deep
    });

    const { docs: posts, totalPages } = postsResponse;

    if (!posts.length && page > 1) {
      return notFound();
    }

    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Our Blog</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: Post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {post.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image.url}
                    alt={post.image.alt || post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                {post.excerpt && (
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                )}
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{post.author?.name || 'Unknown Author'}</span>
                  <span>
                    {post.publishedDate ?
                      format(new Date(post.publishedDate), 'MMM dd, yyyy') :
                      'Unknown date'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            {page > 1 && (
              <Link
                href={`/blog?page=${page - 1}`}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Previous
              </Link>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Link
                key={pageNum}
                href={`/blog?page=${pageNum}`}
                className={`px-4 py-2 border rounded ${pageNum === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                  }`}
              >
                {pageNum}
              </Link>
            ))}

            {page < totalPages && (
              <Link
                href={`/blog?page=${page + 1}`}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return <div>Failed to load blog posts</div>;
  }
}