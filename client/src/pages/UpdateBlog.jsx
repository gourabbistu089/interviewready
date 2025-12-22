import React, { useState, useEffect } from 'react';
import { Editor } from 'primereact/editor';
import axios from 'axios';
import { 
  BookOpen, 
  Tag, 
  Clock, 
  FileText, 
  Image, 
  Folder, 
  Save,
  Send,
  Plus,
  X,
  Upload,
  Trash2,
  Sparkles,
  ArrowLeft,
  Loader
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setBlog } from '../redux/features/blogSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../constants';
import BlogEditor from '../components/BlogEditor';

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    featuredImage: null,
    category: '',
    tags: [],
    status: 'draft',
    readTime: 1
  });
  
  const [newTag, setNewTag] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [errors, setErrors] = useState({});

  // Fetch existing blog data
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setIsFetching(true);
        const response = await axios.get(`${API_URL}/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        console.log("Response : ",response)
        
        const blog = response.data.blog || response.data;
        
        setFormData({
          title: blog.title || '',
          excerpt: blog.excerpt || '',
          content: blog.content || '',
          featuredImage: null,
          category: blog.category || '',
          tags: blog.tags || [],
          status: blog.status || 'draft',
          readTime: blog.readTime || 1
        });
        
        if (blog.featuredImage) {
          setExistingImageUrl(blog.featuredImage);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error('Failed to load blog data');
        // navigate('/blogs');
      } finally {
        setIsFetching(false);
      }
    };

    if (id) {
      fetchBlogData();
    }
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        featuredImage: file
      }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setExistingImageUrl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      featuredImage: null
    }));
    setImagePreview(null);
    setExistingImageUrl(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.featuredImage && !existingImageUrl) {
      newErrors.featuredImage = 'Featured image is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (formData.tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (status) => {
    if (!validateForm()) {
      toast.error(errors.title || errors.excerpt || errors.content || errors.featuredImage || errors.category || errors.tags);
      return;
    }

    setIsLoading(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('excerpt', formData.excerpt);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('tags', JSON.stringify(formData.tags));
      formDataToSend.append('status', status);
      formDataToSend.append('readTime', formData.readTime);
      
      if (formData.featuredImage) {
        formDataToSend.append('featuredImage', formData.featuredImage);
      }

      const response = await axios.put(`${API_URL}/blogs/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.status === 200 || response.status === 201) {
        toast.success(`Blog ${status === 'published' ? 'published' : 'updated'} successfully!`);
        dispatch(setBlog(response.data.blog));
        navigate(`/blog/${id}`);
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('Error updating blog. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    'Technology', 'Programming', 'Web Development', 'Data Science', 'Interview Tips', 'Computer Science', 'Tutorials', 'Best Practices', 'Others'
  ];

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading blog data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Update Blog Post</h1>
            <p className="text-gray-600">Edit and refine your content</p>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="p-8 space-y-8">
            
            {/* Featured Image Section */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
                <Image className="w-5 h-5 text-blue-500" />
                Featured Image
                <span className="text-red-500 text-xs">*</span>
              </label>
              <div className="space-y-4">
                {!imagePreview && !existingImageUrl ? (
                  <div className={`border-2 border-dashed ${errors.featuredImage ? 'border-red-300' : 'border-gray-300'} rounded-xl p-8 text-center hover:border-blue-400 transition-colors`}>
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <Upload className="w-6 h-6 text-blue-500" />
                      </div>
                      <p className="text-gray-600 mb-4">Drop your image here or click to browse</p>
                      <label className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
                        <Upload className="w-4 h-4" />
                        Choose Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="relative group">
                    <img
                      src={imagePreview || existingImageUrl}
                      alt="Featured image preview"
                      className="w-full h-64 object-cover rounded-xl border border-gray-200 shadow-sm"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-3">
                      <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
                        <Upload className="w-4 h-4" />
                        Change
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                )}
                {errors.featuredImage && (
                  <p className="text-red-500 text-sm mt-1">{errors.featuredImage}</p>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <FileText className="w-5 h-5 text-purple-500" />
                Blog Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white/50 backdrop-blur-sm text-lg placeholder-gray-400"
                placeholder="Enter an engaging title for your blog post..."
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Sparkles className="w-5 h-5 text-rose-500" />
                Excerpt
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                rows="3"
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all resize-none bg-white/50 backdrop-blur-sm placeholder-gray-400"
                placeholder="Write a compelling excerpt that will make readers want to read more..."
              />
            </div>

            {/* Content Editor */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <BookOpen className="w-5 h-5 text-blue-500" />
                Content *
              </label>
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm">
                {/* <Editor
                  value={formData.content}
                  onTextChange={(e) => handleInputChange('content', e.htmlValue)}
                  style={{ height: '450px' }}
                  className="bg-white/50"
                /> */}
                <BlogEditor formData={formData} setFormData={setFormData}/>
              </div>
            </div>

            {/* Category & Read Time Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Folder className="w-5 h-5 text-indigo-500" />
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white/50 backdrop-blur-sm"
                >
                  <option value="">Select a category...</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Clock className="w-5 h-5 text-orange-500" />
                  Read Time (minutes)
                </label>
                <input
                  type="number"
                  value={formData.readTime}
                  onChange={(e) => handleInputChange('readTime', parseInt(e.target.value) || 1)}
                  min="1"
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Tags Section */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Tag className="w-5 h-5 text-green-500" />
                Tags
              </label>
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white/50 backdrop-blur-sm placeholder-gray-400"
                  placeholder="Add a tag and press Enter..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium shadow-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-blue-600 hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => handleSubmit('draft')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                Save as Draft
              </button>
              <button
                type="button"
                onClick={() => handleSubmit('published')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Update & Publish
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;