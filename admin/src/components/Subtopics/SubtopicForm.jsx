
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {motion } from "framer-motion";
import {
  Save,
  Video,
  FileText,
  BookOpen,
  X,
  Plus,
  Tag,
  Clock,
  BarChart3,
  Hash,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

const ChipInput = ({ value = [], onChange, placeholder, required = false }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const addTag = () => {
    if (inputValue.trim()) {
      const newTag = inputValue.trim();
      if (!value.includes(newTag)) {
        onChange([...value, newTag]);
        setInputValue("");
        setError("");
      } else {
        setError("Tag already exists");
      }
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    } else if (e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-lg min-h-[42px] bg-white focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500">
        {value.map((tag, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:bg-green-200 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 outline-none bg-transparent min-w-[120px]"
        />
        <button
          type="button"
          onClick={addTag}
          className="text-green-600 hover:text-green-700 p-1"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {required && value.length === 0 && (
        <p className="text-sm text-red-600">At least one tag is required</p>
      )}
      <p className="text-sm text-gray-500">
        Press Enter or comma to add tags. Click × to remove them.
      </p>
    </div>
  );
};

const SubtopicForm = ({ subtopic, onClose }) => {
  const { addSubtopic, updateSubtopic, topics, user } = useApp();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: subtopic || {
      title: "",
      description: "",
      magicNotes: "",
      topicId: "",
      tags: [],
      difficulty: "easy",
      estimatedTime: "30 minutes",
      order: 0,
      content: {
        youtubeLinks: {
          url: "",
        },
        notesLinks: {
          url: "",
        },
        handwrittenPDFs: {
          url: "",
        },
      },
      isActive: true,
    },
  });

  const watchedContent = watch("content");

  const onSubmit = (data) => {
    console.log("Submitting subtopic data:", data);
    // Handle form submission logic here
    if (subtopic) {
      updateSubtopic(subtopic._id, data);
    } else {
      addSubtopic(data);
    }
    //     onClose();
    onClose();
  };

  const difficulties = [
    { value: "easy", label: "Easy", color: "text-green-600 bg-green-50" },
    { value: "medium", label: "Medium", color: "text-yellow-600 bg-yellow-50" },
    { value: "hard", label: "Hard", color: "text-red-600 bg-red-50" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
          <h2 className="text-2xl font-bold">
            {subtopic ? "Edit Subtopic" : "Create New Subtopic"}
          </h2>
          <p className="text-green-100 mt-1">
            {subtopic
              ? "Update the subtopic information below"
              : "Fill in the details to create a new subtopic"}
          </p>
        </div>

        <div className="p-6 space-y-8">
          {/* Basic Information Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Basic Information
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Topic Selection */}
              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent Topic *
                </label>
                <select
                  {...register("topicId", { required: "Topic is required" })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm"
                >
                  <option value="">Select a topic</option>
                  {topics.map((topic) => (
                    <option key={topic._id} value={topic._id}>
                      {topic.title}
                    </option>
                  ))}
                </select>
                {errors.topicId && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.topicId.message}
                  </p>
                )}
              </div>

              {/* Order */}
              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Hash className="inline w-4 h-4 mr-1" />
                  Order
                </label>
                <input
                  type="number"
                  {...register("order", { valueAsNumber: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
                placeholder="Enter a clear and descriptive title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm resize-none"
                placeholder="Provide a detailed description of what this subtopic covers"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>
            {/* Magic Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Magic Notes *
              </label>
              <textarea
                {...register("magicNotes", {
                  required: "Magic Notes is required",
                })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm resize-none"
                placeholder="Provide a detailed description of what this subtopic covers"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <BarChart3 className="inline w-4 h-4 mr-1" />
                  Difficulty Level
                </label>
                <select
                  {...register("difficulty")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm"
                >
                  {difficulties.map((diff) => (
                    <option key={diff.value} value={diff.value}>
                      {diff.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Estimated Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline w-4 h-4 mr-1" />
                  Estimated Time
                </label>
                <input
                  type="text"
                  {...register("estimatedTime")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
                  placeholder="e.g., 30 minutes, 1 hour"
                />
              </div>
            </div>

            {/* Tags with Chip Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="inline w-4 h-4 mr-1" />
                Tags *
              </label>
              <Controller
                name="tags"
                control={control}
                rules={{ required: "At least one tag is required" }}
                render={({ field }) => (
                  <ChipInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Add tags like ACID, Concurrency, Deadlock..."
                    required={true}
                  />
                )}
              />
              {errors.tags && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.tags.message}
                </p>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6 border-t border-gray-200 pt-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Video className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Content Resources
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* YouTube Link */}
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Video className="inline w-4 h-4 mr-2 text-red-600" />
                  YouTube Video URL
                </label>
                <input
                  type="url"
                  {...register("content.youtubeLinks.url")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <p className="mt-2 text-sm text-gray-600">
                  Add a YouTube video that explains this subtopic clearly
                </p>
              </div>

              {/* Notes Link */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="inline w-4 h-4 mr-2 text-blue-600" />
                  Notes/Resource URL
                </label>
                <input
                  type="url"
                  {...register("content.notesLinks.url")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  placeholder="https://www.geeksforgeeks.org/..."
                />
                <p className="mt-2 text-sm text-gray-600">
                  Link to online articles, tutorials, or documentation
                </p>
              </div>

              {/* Handwritten PDFs Link */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <BookOpen className="inline w-4 h-4 mr-2 text-purple-600" />
                  Handwritten PDFs URL
                </label>
                <input
                  type="url"
                  {...register("content.handwrittenPDFs.url")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                  placeholder="https://drive.google.com/file/d/..."
                />
                <p className="mt-2 text-sm text-gray-600">
                  Link to handwritten notes or PDFs (Google Drive, Dropbox,
                  etc.)
                </p>
              </div>
            </div>
          </div>

          {/* Status Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register("isActive")}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label className="text-sm font-medium text-gray-700">
                Make this subtopic active and visible to students
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit(onSubmit)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg font-medium"
            >
              <Save className="w-4 h-4" />
              <span>{subtopic ? "Update" : "Create"} Subtopic</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SubtopicForm;
