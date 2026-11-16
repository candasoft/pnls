import Image from "next/image";
import Link from "next/link";
import posts from "@/app/blog/posts.json";
import blogStyles from "@/app/blog/blog.module.css";
import styles from "./BlogPreview.module.css";

export function BlogPreview() {
  return (
    <section className={`section ${blogStyles.page}`} id="blog" aria-labelledby="blog-preview-title">
      <div className="container">
        <div className={styles.heading}>
          <div>
            <span className="eyebrow">The festival journal</span>
            <h2 id="blog-preview-title">Stories for Your Next Step.</h2>
            <p>Festival stories, helpful guides and fresh opportunities to explore.</p>
          </div>
          <Link className="btn btn-outline" href="/blog">View all stories <span aria-hidden="true">↗</span></Link>
        </div>
        <div className={blogStyles.grid}>
          {posts.slice(0, 3).map((post) => (
            <article className={blogStyles.card} key={post.slug}>
              <Link href={`/blog/${post.slug}`} className={blogStyles.cardImage} tabIndex={-1} aria-hidden="true">
                <Image src={post.image} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" />
              </Link>
              <div className={blogStyles.cardBody}>
                <span className={blogStyles.label}>{post.category}</span>
                <h3 lang={post.language}><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                <p className={blogStyles.excerpt} lang={post.language}>{post.excerpt}</p>
                <Link className={blogStyles.readLink} href={`/blog/${post.slug}`}>
                  Read the story <span aria-hidden="true">↗</span><span className={blogStyles.srOnly}>: {post.title}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
