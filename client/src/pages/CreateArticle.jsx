import { useState } from "react";
import ArticleEditor from "../components/ArticleEditor";
import axios from "axios";
import { API_URL } from "../constants";


const CreateArticle = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
     const res = await axios.post(`${API_URL}/articles`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Article published successfully!");

      setFormData({
        title: "",
        category: "",
        content: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to publish article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">
          Create New Article
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
               onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
              }
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
              placeholder="Enter article title"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block font-medium mb-1">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
              }
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>
          {/* Editor */}
          <div>
            <label className="block font-medium mb-2">
              Content
            </label>
            <ArticleEditor
              value={formData.content}
              onChange={(content) =>
                setFormData({ ...formData, content })
              }
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {loading ? "Publishing..." : "Publish Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateArticle;



