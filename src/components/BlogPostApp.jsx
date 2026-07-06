/* BlogPostApp.jsx — root composition for the blog detail page (ported from blog-post-app.jsx)
   Deviates from the source: post/related are passed in as props, resolved at
   build time by src/pages/blog/[slug].astro via getStaticPaths(), instead of
   being fetched client-side from a `?post=slug` query string. See that file
   for the rationale (this is the real WordPress single.php-style routing the
   original prototype's comments described as the eventual target). */
import { NavBar, Footer, ChatOverlay, ContactSection, useKarinChat } from './shared.jsx';
import { ArticleHeader, ArticleBody, ShareBar, AuthorBioCard, RelatedPostsSection, PostNotFound } from './blog-post.jsx';

export default function BlogPostApp({ post, related }) {
  const chat = useKarinChat();
  return (
    <>
      <NavBar breadcrumb={post.category.name} />
      <ArticleHeader post={post} />
      <ArticleBody html={post.contentHtml} />
      <ShareBar post={post} />
      <AuthorBioCard author={post.author} />
      {related.length > 0 && <RelatedPostsSection posts={related} />}
      <ContactSection
        chat={chat}
        eyebrow="Hablemos"
        title="¿Te identificas con este problema?"
        subtitle="Conversemos sobre tu operación y qué costuras están rompiendo la experiencia de tus clientes."
        bullets={['Diagnóstico gratuito','Propuesta técnica y a la medida','Sin contratos forzosos ni suscripciones']}
      />
      <Footer />
      {chat.open && <ChatOverlay chat={chat} />}
    </>
  );
}

/* Defensive fallback: getStaticPaths() only ever generates real slugs, so
   fetchPostBySlug() should never actually return null here — but the source
   contract (fetchPostBySlug can return null) is kept intact, so [slug].astro
   renders this instead of <BlogPostApp> when post is falsy. */
export function NotFoundPage() {
  return (
    <>
      <NavBar breadcrumb="Blog" />
      <PostNotFound />
      <Footer />
    </>
  );
}
