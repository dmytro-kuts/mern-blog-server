import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Invalid mail format').isEmail(),
  body('password', 'The password must be at least 6 characters long').isLength({ min: 6 }),
];

export const registerValidation = [
  body('email', 'Invalid mail format').isEmail(),
  body('password', 'The password must be at least 6 characters long').isLength({ min: 6 }),
  body('userName', 'Enter a name').isLength({ min: 2 }),
  body('avatarUrl', 'Invalid avatar link').optional().isString(),
];

export const postCreateValidation = [
  body('title', 'Enter the title of the article').isLength({ min: 3 }).isString(),
  body('text', 'Enter the text of the article').isLength({ min: 10 }).isString(),
  body('imageUrl', 'Invalid image link').optional().isString(),
];
