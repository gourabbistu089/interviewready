const { body, validationResult } = require('express-validator');

// Validation middleware
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    next();
  };
};

// User validation rules
const userValidationRules = () => {
  return [
    body('username')
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters long')
      .isAlphanumeric()
      .withMessage('Username must contain only letters and numbers'),
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('firstName')
      .notEmpty()
      .withMessage('First name is required')
      .trim(),
    body('lastName')
      .notEmpty()
      .withMessage('Last name is required')
      .trim()
  ];
};

// Login validation rules
const loginValidationRules = () => {
  return [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
  ];
};

// Topic validation rules
const topicValidationRules = () => {
  return [
    body('title')
      .notEmpty()
      .withMessage('Topic title is required')
      .trim(),
    body('description')
      .notEmpty()
      .withMessage('Topic description is required')
      .trim(),
    body('category')
      .notEmpty()
      .withMessage('Topic category is required')
      .isIn(['Technical', 'Behavioral', 'System Design', 'Data Structures', 'Algorithms', 'Programming Languages', 'Databases', 'Web Development', 'Mobile Development', 'DevOps', 'Security', 'Testing', 'Soft Skills'])
      .withMessage('Invalid category'),
    body('estimatedTime')
      .isInt({ min: 1 })
      .withMessage('Estimated time must be a positive integer')
  ];
};

// Question validation rules
const questionValidationRules = () => {
  return [
    body('title')
      .notEmpty()
      .withMessage('Question title is required')
      .trim(),
    body('description')
      .notEmpty()
      .withMessage('Question description is required')
      .trim(),
    body('type')
      .isIn(['multiple-choice', 'coding', 'essay', 'behavioral'])
      .withMessage('Invalid question type'),
    body('difficulty')
      .isIn(['Easy', 'Medium', 'Hard'])
      .withMessage('Invalid difficulty level'),
    body('category')
      .notEmpty()
      .withMessage('Question category is required'),
    body('topicId')
      .isMongoId()
      .withMessage('Invalid topic ID')
  ];
};

// Blog validation rules
const blogValidationRules = () => {
  return [
    body('title')
      .notEmpty()
      .withMessage('Blog title is required')
      .trim(),
    body('excerpt')
      .notEmpty()
      .withMessage('Blog excerpt is required')
      .isLength({ max: 300 })
      .withMessage('Excerpt cannot exceed 300 characters')
      .trim(),
    body('content')
      .notEmpty()
      .withMessage('Blog content is required'),
    body('category')
      .isIn(['Interview Tips', 'Career Advice', 'Technical Insights', 'Industry News', 'Success Stories', 'Tutorials', 'Best Practices'])
      .withMessage('Invalid blog category')
  ];
};

module.exports = {
  validate,
  userValidationRules,
  loginValidationRules,
  topicValidationRules,
  questionValidationRules,
  blogValidationRules
};