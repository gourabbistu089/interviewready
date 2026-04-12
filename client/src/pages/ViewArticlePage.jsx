import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import axios from "axios";
import { API_URL } from "../constants";

const getArticleBySlug = (slug) => {
  return axios.get(`${API_URL}/articles/${slug}`);
};

const ViewArticlePage = () => {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await getArticleBySlug(slug);
        setArticle(res.data);
      } catch (err) {
        setError("Article not found");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        
        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">
          {article.title}
        </h1>

        {/* Meta */}
        <div className="text-sm text-gray-500 mb-6">
          <span>
            By <strong>{article.author?.name || "Admin"}</strong>
          </span>
          {" • "}
          <span>
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>

        {/* Article Content with custom markdown styles */}
        <article className="markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-5 mb-2" {...props} />,
              h4: ({node, ...props}) => <h4 className="text-lg font-semibold mt-4 mb-2" {...props} />,
              p: ({node, ...props}) => <p className="mb-4 leading-7 text-gray-700" {...props} />,
              a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 ml-4 space-y-2" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 ml-4 space-y-2" {...props} />,
              li: ({node, ...props}) => <li className="text-gray-700" {...props} />,
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600" {...props} />
              ),
              code: ({node, inline, className, children, ...props}) => {
                return inline ? (
                  <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                    {children}
                  </code>
                ) : (
                  <code className={`${className} block`} {...props}>
                    {children}
                  </code>
                );
              },
              pre: ({node, ...props}) => (
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4" {...props} />
              ),
              img: ({node, ...props}) => <img className="rounded-lg my-4 max-w-full h-auto" {...props} />,
              table: ({node, ...props}) => (
                <div className="overflow-x-auto mb-4">
                  <table className="min-w-full border-collapse border border-gray-300" {...props} />
                </div>
              ),
              thead: ({node, ...props}) => <thead className="bg-gray-100" {...props} />,
              th: ({node, ...props}) => <th className="border border-gray-300 px-4 py-2 text-left font-semibold" {...props} />,
              td: ({node, ...props}) => <td className="border border-gray-300 px-4 py-2" {...props} />,
              hr: ({node, ...props}) => <hr className="my-8 border-gray-300" {...props} />,
            }}
          >
            {article.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default ViewArticlePage;