import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import axios from "axios";
import Navbar from '../../components/Header'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await axios.get(`/api/blogs/${slug}`);
        const p = res.data?.data?.post;
        if (!cancelled) {
          if (p) setPost(p);
          else setNotFound(true);
        }
      } catch (err) {
        if (!cancelled) {
          if (err.response?.status === 404) setNotFound(true);
          else console.error("[blog post] fetch failed:", err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
    
      <main className="flex min-h-screen items-center justify-center bg-[#f4f3ef]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#d8d7d2] border-t-[#171717]" />
      </main>
    );
  }

  if (notFound || !post) {
    return (
      <>
      <SEO title="Post Not Found - DevbyNosa" path={`/writing/${slug}`} />
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#f4f3ef] px-5 text-center">
        <p className="font-['Space_Grotesk'] text-[28px] font-medium tracking-[-1px]">
          Post not found.
        </p>
        <p className="mt-3 text-[15px] text-[#686868]">
          This post may have been moved or unpublished.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 border-b border-[#171717] pb-1 text-[14px] font-medium transition-colors hover:text-[#315bea]"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>
      </main>
      </>
    );
  }

  const postDescription = post.excerpt || `${post.title} by Igbinosa Nosa.`;
  const postImage = post.cover || "/og-image.png";

  return (
    <>
    <SEO
      title={`${post.title} - DevbyNosa`}
      description={postDescription}
      path={`/writing/${slug}`}
      image={postImage}
      type="article"
      article={{
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt,
        tags: post.tags,
      }}
    />
    <Navbar />
    <main className="min-h-screen bg-[#f4f3ef] text-[#171717]">
      {/* Top bar */}
      <div className="mx-auto w-[90%] max-w-[760px] pt-[60px]">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-[14px] text-[#686868] transition-colors hover:text-[#171717] cursor-pointer"
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </div>

      {/* Header */}
      <article className="mx-auto w-[90%] max-w-[760px] pt-[40px]">
        <p className="font-sans text-[13px] font-semibold tracking-[1.8px] text-[#686868]">
          {post.tags?.[0]?.toUpperCase() || "WRITING"}
        </p>

        <h1 className="mt-[15px] font-['Space_Grotesk'] text-[42px] font-medium leading-[1.05] tracking-[-2px] md:text-[52px]">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-[25px] max-w-[600px] text-[18px] leading-[1.6] text-[#686868]">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="mt-[35px] flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-[#d8d7d2] pb-[35px] text-[14px] text-[#686868]">
          <span className="flex items-center gap-2">
            <Calendar size={14} />
            {formatDate(post.createdAt)}
          </span>

          {post.readTime && (
            <span className="flex items-center gap-2">
              <Clock size={14} />
              {post.readTime}
            </span>
          )}
        </div>

        {/* Cover image */}
        {post.cover && (
          <div className="mt-[40px] overflow-hidden border border-[#d8d7d2]">
            <img
              src={post.cover}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="mt-[50px] whitespace-pre-line break-words text-[17px] leading-[1.85] text-[#3a3a3a]">
          {post.content}
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mt-[60px] flex flex-wrap gap-2 border-t border-[#d8d7d2] pt-[30px]">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[2px] border border-[#d8d7d2] px-[10px] py-[6px] text-[13px] text-[#686868]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer link */}
        <div className="mt-[60px] mb-[100px]">
          <Link
            to="/"
            className="inline-flex items-center gap-2 border-b border-[#171717] pb-1 text-[15px] font-medium transition-colors hover:text-[#315bea]"
          >
            <ArrowLeft size={15} />
            Back to portfolio
          </Link>
        </div>
      </article>
    </main>
    <Footer />
    </>
  );
}