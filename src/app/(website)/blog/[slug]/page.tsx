import { notFound } from 'next/navigation';
import payload from 'payload';
import Image from 'next/image';
import { format } from 'date-fns';
import Link from 'next/link';


// Generate metadata for the page
export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const post = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
    }).then(res => res.docs[0]);

    if (!post) return { title: 'Post Not Found' };

    return {
      title: post.Seo?.metaTitle || post.title,
      description: post.Seo?.metaDescription || post.excerpt,
      keywords: post.Seo?.metaKeywords?.map(k => k.keyword).join(','),
    };
  } catch (error) {
    return {
      title: 'Blog Post',
    };
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = params;

  try {
    // Fetch the post by slug
    const postResponse = await payload.find({
      collection: 'posts',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      depth: 2, // Resolve relationships two levels deep
    });

    if (!postResponse.docs.length) {
      return notFound();
    }

    const post = postResponse.docs[0];

    // For the rich text content - if using payload's rich text editor
    // Note: you might need different processing based on your richText setup
    const content = post.content;

    return (
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/blog" className="text-blue-500 mb-6 inline-block">
          &larr; Back to Blog
        </Link>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="mb-8 text-gray-600">
          <span>By {post.author?.name || 'Unknown Author'}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.publishedDate}>
            {format(new Date(post.publishedDate), 'MMMM dd, yyyy')}
          </time>

          {post.tags?.length > 0 && (
            <>
              <span className="mx-2">•</span>
              <div className="inline-flex gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag.id}
                    className="bg-gray-100 px-2 py-1 rounded text-sm"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {post.image && (
          <div className="relative w-full h-96 mb-8">
            <Image
              src={post.image.url}
              alt={post.imageAlt || post.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        )}

        <div className="prose max-w-none">
          {/* Render the rich text content */}
          {/* Note: The exact rendering depends on how your richText is configured */}
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        {post.relatedPosts?.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {post.relatedPosts.map(related => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold mb-2">{related.title}</h3>
                  {related.excerpt && (
                    <p className="text-sm text-gray-600">{related.excerpt}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    );
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return <div>Failed to load blog post</div>;
  }
}

// Generate static params for static site generation
export async function generateStaticParams() {
  // Fetch all published post slugs
  const posts = await payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: 100, // Adjust based on your needs
  });

  return posts.docs.map((post) => ({
    slug: post.slug,
  }));
}