import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Невірний формат пошти').isEmail(),
  body('password', 'Пароль повинен бути не менш ніж 6 символів').isLength({ min: 6 }),
];

export const registerValidation = [
  body('email', 'Невірний формат пошти').isEmail(),
  body('password', 'Пароль повинен бути не менш ніж 6 символів').isLength({ min: 6 }),
  body('userName', 'Вкажіть імя').isLength({ min: 3 }),
  body('avatarUrl', 'Не вірне посилання на аватар').optional().isString(),
];

export const postCreateValidation = [
  body('title', 'Введіть заголовок статті').isLength({ min: 3 }).isString(),
  body('text', 'Введіть текст статті').isLength({ min: 10 }).isString(),
  body('imageUrl', 'Не вірне посилання на зображення').optional().isString(),
];
