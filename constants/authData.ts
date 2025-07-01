import * as dotenv from 'dotenv';
dotenv.config();

interface RegisteredUser {
  email: string;
  emailUpperCase: string;
  mobile: string;
  mobileVar1: string;
  mobileVar2: string;
  password: string;
}

const validEmail = process.env.USER_EMAIL ?? '';
const validMobile = process.env.USER_MOBILE ?? '';

export const registeredUser: RegisteredUser = {
  email: validEmail,
  emailUpperCase: validEmail.toUpperCase(),
  mobile: validMobile,
  mobileVar1: validMobile.replace('+', ''),
  mobileVar2: validMobile.replace('+380', '0'),
  password: process.env.USER_PASSWORD ?? ''
};

export const texts = {
    registerConfirmText: 'Реєстрація пройшла успішно. Перевірте Вашу пошту та підтвердіть реєстрацію',
    profileVerifNumberText: 'Успішно верифіковано',
    loginErrorText: 'Неправильний формат email або номера телефону',
    passwordErrorText: 'Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли',
    loginFormErrorText: 'Невірний e-mail або пароль',
    emptyFieldErrorText: 'Поле не може бути порожнім',
    lastNameRequired: 'Це поле обов’язкове',
    firstNameRequired: 'Це поле обов’язкове',
    edrpouTooShort: "Код ЄДРПОУ не може бути коротше 8 символів",
    ipnTooShort: "Код ІПН не може бути коротше 10 символів",
    lastNameLettersError: "Прізвище має містити лише літери",
    firstNameLettersError: "Ім'я має містити лише літери",
    middleNameLettersError: "По-батькові має містити лише літери",
    phoneNumberInvalid: 'Некоректний номер телефону',
}

export const cssStyle = {
    errorBorderColor: '1px solid rgb(247, 56, 89)'
}

