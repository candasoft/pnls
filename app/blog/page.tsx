import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import posts from "./posts.json";
import styles from "./blog.module.css";

const title = "Blog | Pyinyar Lam Sone 2027";
const description = "Festival stories, visitor guides, and opportunities for exhibitors and partners at Pyinyar Lam Sone 2027.";

export const metadata: Metadata = {
  title, description,
  openGraph: { title, description },
  twitter: { title, description },
};

export default function BlogPage() {
  const [featured, ...remaining] = posts;
  return <main id="main" className={styles.page}>
    <section className={styles.hero} aria-labelledby="blog-title">
      <div className="container">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Blog</span></nav>
        <div className={styles.heading}>
          <div><span className="eyebrow">The festival journal</span><h1 id="blog-title">Stories for<br /><em>your next step.</em></h1></div>
          <p>Explore education pathways, get to know the festival, and discover ways to be part of Pyinyar Lam Sone.</p>
        </div>
        <article className={styles.featured}>
          <Link href={`/blog/${featured.slug}`} className={styles.featuredImage} tabIndex={-1} aria-hidden="true"><Image src={featured.image} alt="" fill sizes="(max-width: 760px) 100vw, 55vw" loading="eager" /></Link>
          <div className={styles.featuredCopy}>
            <span className={styles.label}>Featured story <span aria-hidden="true">✦</span> {featured.category}</span>
            <h2 lang={featured.language}><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2>
            <p className={styles.excerpt} lang={featured.language}>{featured.excerpt}</p>
            <Link className={styles.readLink} href={`/blog/${featured.slug}`}>Read the story <span aria-hidden="true">↗</span></Link>
          </div>
        </article>
      </div>
    </section>
    <section className={styles.stories} aria-labelledby="stories-title">
      <div className="container">
        <div className={styles.sectionHeading}><h2 id="stories-title">More from the festival</h2><span>{posts.length} stories to explore</span></div>
        <div className={styles.grid}>
          {remaining.map(post => <article key={post.slug} className={styles.card}>
            <Link href={`/blog/${post.slug}`} className={styles.cardImage} tabIndex={-1} aria-hidden="true"><Image src={post.image} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" /></Link>
            <div className={styles.cardBody}><span className={styles.label}>{post.category}</span><h3 lang={post.language}><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p className={styles.excerpt} lang={post.language}>{post.excerpt}</p><Link className={styles.readLink} href={`/blog/${post.slug}`}>Read the story <span aria-hidden="true">↗</span><span className={styles.srOnly}>: {post.title}</span></Link></div>
          </article>)}
        </div>
      </div>
    </section>
    <section className={styles.invitation} aria-labelledby="invitation-title"><div className={`container ${styles.invitationInner}`}><div><span className="eyebrow">One place. Multiple pathways.</span><h2 id="invitation-title">Make your next connection.</h2><p>Join us on 30–31 January 2027 at Myanmar Expo Hall, Yangon.</p></div><Link className="btn btn-gold" href="/about">Explore the festival <span aria-hidden="true">↗</span></Link></div></section>
  </main>;
}
