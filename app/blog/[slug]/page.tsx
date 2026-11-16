import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import posts from "../posts.json";
import styles from "../blog.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find(post => post.slug === slug);
  if (!post) return {};
  const title = `${post.title} | Pyinyar Lam Sone`;
  const description = post.excerpt.replace(/\s+/g, " ");
  return { title, description, openGraph: { title, description, type: "article" }, twitter: { title, description } };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find(post => post.slug === slug);
  if (!post) notFound();
  const related = posts.filter(item => item.slug !== slug).slice(0, 2);

  return <main id="main" className={styles.page}>
    <div className="container">
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blog">Blog</Link><span aria-hidden="true">/</span><span aria-current="page">{post.category}</span></nav>
      <article className={styles.article}>
        <header className={styles.articleHeader}><span className={styles.label}>{post.category}</span><h1 lang={post.language}>{post.title}</h1><p className={styles.byline}>Pyinyar Lam Sone <span aria-hidden="true">✦</span> Education &amp; Career Pathways Festival</p></header>
        <div className={styles.articleImage}><Image src={post.image} alt="" fill sizes="(max-width: 1000px) 100vw, 940px" loading="eager" /></div>
        <div className={styles.articleBody} lang={post.language}>{post.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
        <div className={styles.articleFooter}><Link className={styles.readLink} href="/blog"><span aria-hidden="true">←</span> Back to all stories</Link><Link className={styles.readLink} href="/contact">Contact the festival team <span aria-hidden="true">↗</span></Link></div>
      </article>
      <section className={styles.related} aria-labelledby="related-title"><span className="eyebrow">Keep exploring</span><h2 id="related-title">Your next read</h2><div className={styles.relatedGrid}>{related.map(item => <Link key={item.slug} href={`/blog/${item.slug}`}><span className={styles.label}>{item.category}</span><h3 lang={item.language}>{item.title}</h3><span className={styles.readLink}>Read the story <span aria-hidden="true">↗</span></span></Link>)}</div></section>
    </div>
  </main>;
}
