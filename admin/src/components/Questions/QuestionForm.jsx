

import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  Plus, 
  Trash2, 
  X, 
  Tag, 
  Building, 
  Clock, 
  Target,
  FileText,
  Link,
  Youtube,
  BookOpen,
  FileDown,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

// Chip Input Component
const ChipInput = ({ value = [], onChange, placeholder, icon: Icon, className = '' }) => {
  const [inputValue, setInputValue] = useState('');

  const addChip = (chipValue) => {
    if (chipValue.trim() && !value.includes(chipValue.trim())) {
      onChange([...value, chipValue.trim()]);
      setInputValue('');
    }
  };

  const removeChip = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addChip(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeChip(value.length - 1);
    }
  };

  return (
    <div className={`min-h-[42px] px-3 py-2 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white ${className}`}>
      <div className="flex flex-wrap gap-2 items-center">
        {Icon && <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />}
        <AnimatePresence>
          {value.map((chip, index) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full"
            >
              {chip}
              <button
                type="button"
                onClick={() => removeChip(index)}
                className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addChip(inputValue)}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] outline-none bg-transparent text-sm"
        />
      </div>
    </div>
  );
};

const QuestionForm = ({ question, onClose }) => {
    const { addQuestion, updateQuestion, topics, subtopics } = useApp();
 const [selectedTopic, setSelectedTopic] = useState(question?.topicId || '');
  const { register, handleSubmit, control, formState: { errors }, watch, setValue } = useForm({
    defaultValues: question || {
      title: '',
      question: '',
      type: 'multiple-choice',
      topicId: '',
      subtopicId: '',
      difficulty: 'easy',
      options: [{ text: '', isCorrect: false }],
      correctAnswer: '',
      explanation: '',
      tags: [],
      company: [],
      frequency: 1,
      timeLimit: 2,
      points: 1,
      content: {
        practiceLinks: { url: '' },
        youtubeLinks: { url: '' },
        notesLinks: { url: '' },
        handwrittenPDFs: { driveUrl: '' }
      }
    }
  });

  const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
    control,
    name: 'options'
  });

  const watchType = watch('type');
  const watchTopic = watch('topicId');

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    // Your submission logic here
    if (question) {
      updateQuestion(question._id, data);
    } else {
      addQuestion(data);
    }
    onClose();
  };

  const types = [
    { value: 'multiple-choice', label: 'Multiple Choice', icon: CheckCircle },
    { value: 'true-false', label: 'True/False', icon: Target },
    { value: 'short-answer', label: 'Short Answer', icon: FileText },
    { value: 'coding', label: 'Coding', icon: FileDown },
    { value: 'essay', label: 'Essay', icon: BookOpen }
  ];

  const difficulties = [
    { value: 'easy', label: 'Easy', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'hard', label: 'Hard', color: 'bg-red-100 text-red-800' }
  ];

  // Mock data for demonstration
  // const topics = [
  //   { _id: '1', title: 'JavaScript' },
  //   { _id: '2', title: 'React' },
  //   { _id: '3', title: 'Node.js' }
  // ];

  // const subtopics = [
  //   { _id: '1', title: 'ES6 Features', topicId: { _id: '1' } },
  //   { _id: '2', title: 'Async/Await', topicId: { _id: '1' } },
  //   { _id: '3', title: 'Hooks', topicId: { _id: '2' } },
  //   { _id: '4', title: 'State Management', topicId: { _id: '2' } }
  // ];

  const filteredSubtopics = subtopics.filter(subtopic => subtopic.topicId._id === watchTopic);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <h3 className="text-2xl font-bold text-white">
            {question ? 'Edit Question' : 'Create New Question'}
          </h3>
          <p className="text-blue-100 mt-1">
            {question ? 'Update your question details' : 'Add a new question to your collection'}
          </p>
        </div>

        <div className="p-6 space-y-8">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-blue-600" />
              <h4 className="text-xl font-semibold text-gray-900">Basic Information</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Topic Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Topic *
                </label>
                <select
                  {...register('topicId', { required: 'Topic is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
                >
                  <option value="">Select a topic</option>
                  {topics.map(topic => (
                    <option key={topic._id} value={topic._id}>{topic.title}</option>
                  ))}
                </select>
                {errors.topicId && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-1 text-sm text-red-600"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.topicId.message}
                  </motion.p>
                )}
              </div>

              {/* Subtopic Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Subtopic
                </label>
                <select
                  {...register('subtopicId')}
                  disabled={!watchTopic}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-50 transition-all"
                >
                  <option value="">Select a subtopic</option>
                  {filteredSubtopics.map(subtopic => (
                    <option key={subtopic._id} value={subtopic._id}>{subtopic.title}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Question Title *
              </label>
              <input
                type="text"
                {...register('title', { required: 'Title is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter a descriptive title for your question"
              />
              {errors.title && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1 text-sm text-red-600"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.title.message}
                </motion.p>
              )}
            </div>

            {/* Question Content */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Question Content *
              </label>
              <textarea
                {...register('question', { required: 'Question is required' })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                placeholder="Write your question here..."
              />
              {errors.question && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1 text-sm text-red-600"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.question.message}
                </motion.p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Question Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Question Type *
                </label>
                <select
                  {...register('type', { required: 'Type is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
                >
                  {types.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Difficulty *
                </label>
                <select
                  {...register('difficulty', { required: 'Difficulty is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
                >
                  {difficulties.map(diff => (
                    <option key={diff.value} value={diff.value}>{diff.label}</option>
                  ))}
                </select>
              </div>

              {/* Time Limit */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Time Limit (minutes)
                </label>
                <input
                  type="number"
                  {...register('timeLimit', { valueAsNumber: true, min: 1 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  min="1"
                />
              </div>
            </div>
          </motion.div>

          {/* Question Type Specific Fields */}
          <AnimatePresence mode="wait">
            {watchType === 'multiple-choice' && (
              <motion.div
                key="multiple-choice"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h4 className="text-xl font-semibold text-gray-900">Multiple Choice Options</h4>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => appendOption({ text: '', isCorrect: false })}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Option
                  </motion.button>
                </div>

                <div className="space-y-4">
                  {optionFields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border-2 border-transparent hover:border-blue-200 transition-all"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          {...register(`options.${index}.isCorrect`)}
                          className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-600">Correct</label>
                      </div>
                      <input
                        {...register(`options.${index}.text`, { required: 'Option text is required' })}
                        placeholder={`Option ${index + 1}`}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                      {optionFields.length > 1 && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => removeOption(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {watchType === 'true-false' && (
              <motion.div
                key="true-false"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <h4 className="text-xl font-semibold text-gray-900">True/False Answer</h4>
                </div>
                <div className="flex gap-6">
                  <label className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border-2 border-transparent hover:border-green-200 cursor-pointer transition-all">
                    <input
                      type="radio"
                      {...register('correctAnswer', { required: 'Answer is required' })}
                      value="true"
                      className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <span className="text-green-700 font-medium">True</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border-2 border-transparent hover:border-red-200 cursor-pointer transition-all">
                    <input
                      type="radio"
                      {...register('correctAnswer', { required: 'Answer is required' })}
                      value="false"
                      className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300"
                    />
                    <span className="text-red-700 font-medium">False</span>
                  </label>
                </div>
              </motion.div>
            )}

            {(watchType === 'short-answer' || watchType === 'coding' || watchType === 'essay') && (
              <motion.div
                key="text-answer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <h4 className="text-xl font-semibold text-gray-900">Expected Answer</h4>
                </div>
                <textarea
                  {...register('correctAnswer')}
                  rows={watchType === 'essay' ? 8 : 4}
                  placeholder={
                    watchType === 'coding' 
                      ? 'Enter the expected code solution...'
                      : watchType === 'essay'
                      ? 'Enter evaluation criteria or sample answer...'
                      : 'Enter the correct answer...'
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Explanation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <h4 className="text-xl font-semibold text-gray-900">Explanation</h4>
            </div>
            <textarea
              {...register('explanation')}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
              placeholder="Provide a detailed explanation of the answer..."
            />
          </motion.div>

          {/* Tags and Companies */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-yellow-600" />
              <h4 className="text-xl font-semibold text-gray-900">Tags & Companies</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Tags
                </label>
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <ChipInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Add tags (press Enter or comma)"
                      icon={Tag}
                    />
                  )}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Companies
                </label>
                <Controller
                  name="company"
                  control={control}
                  render={({ field }) => (
                    <ChipInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Add companies (press Enter or comma)"
                      icon={Building}
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Frequency
                </label>
                <input
                  type="number"
                  {...register('frequency', { valueAsNumber: true, min: 1 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Points
                </label>
                <input
                  type="number"
                  {...register('points', { valueAsNumber: true, min: 1 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  min="1"
                />
              </div>
            </div>
          </motion.div>

          {/* Resource Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2">
              <Link className="w-5 h-5 text-green-600" />
              <h4 className="text-xl font-semibold text-gray-900">Resource Links</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Link className="w-4 h-4" />
                  Practice Link
                </label>
                <input
                  type="url"
                  {...register('content.practiceLinks.url')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="https://leetcode.com/problems/..."
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Youtube className="w-4 h-4" />
                  YouTube Video
                </label>
                <input
                  type="url"
                  {...register('content.youtubeLinks.url')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <BookOpen className="w-4 h-4" />
                  Notes Link
                </label>
                <input
                  type="url"
                  {...register('content.notesLinks.url')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="https://docs.google.com/document/..."
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FileDown className="w-4 h-4" />
                  Handwritten PDF
                </label>
                <input
                  type="url"
                  {...register('content.handwrittenPDFs.driveUrl')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  placeholder="https://drive.google.com/file/..."
                />
              </div>
            </div>
          </motion.div>

          {/* Form Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-end gap-4 pt-6 border-t border-gray-200"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit(onSubmit)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg"
            > 
              {/* className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg" */}
            
              <Save className="w-5 h-5" />
              {question ? 'Update Question' : 'Create Question'}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuestionForm;