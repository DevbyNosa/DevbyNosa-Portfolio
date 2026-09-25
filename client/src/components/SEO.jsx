import { Helmet } from "react-helmet-async";

const siteUrl = "https://devbynosa.vercel.app";
const defaultDescription =
  "Full-stack developer building thoughtful web applications with React, Node.js, and PostgreSQL.";

export default function SEO({
  title = "Igbinosa Nosa - Full-Stack Developer",
  description = defaultDescription,
  path = "/",
  image = "/og-image.png",
  type = "website",
  article,
}) {
  const url = `${siteUrl}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="DevbyNosa" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {article?.tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === "article" ? "Article" : "WebSite",
          name: title,
          description,
          url,
          image: imageUrl,
          ...(type === "article"
            ? {
                headline: title,
                datePublished: article?.publishedTime,
                dateModified: article?.modifiedTime || article?.publishedTime,
                author: {
                  "@type": "Person",
                  name: "Igbinosa Nosa",
                  url: siteUrl,
                },
              }
            : {
                author: {
                  "@type": "Person",
                  name: "Igbinosa Nosa",
                  url: siteUrl,
                },
              }),
        })}
      </script>
    </Helmet>
  );
}