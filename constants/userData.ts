import { texts } from '../constants/authData';

export const CUSTOMER_TYPES = {
  LEGAL_ENTITY: 'Юридична особа',
  INDIVIDUAL_ENTREPRENEUR: 'ФОП',
  PRIVATE_PERSON: 'Приватна особа'
} as const;

export const FIELD_LABELS = {
  EDRPOU_LEGAL: 'ЄДРПОУ для юридичних осіб',
  TAX_NUMBER_FOP: 'РНОКПП (ІПН) для ФОП',
  TAX_NUMBER_PRIVATE: 'РНОКПП (ІПН)',
  LAST_NAME: 'Прізвище',
  FIRST_NAME: "Ім'я",
  MIDDLE_NAME: 'По-батькові'
} as const;

export const invalidUserData = {
  invalidNames: {
    withSquareBrackets: '[]',
    withHash: '#',
    withOpenParenthesis: '(',
    withCloseParenthesis: ')',
    withExclamation: '!',
    withPlus: '+',
    withSlash: '/',
    withNumbers: '123'
  },
  invalidPhoneNumbers: {
    tooShort: '+38012345678',
    invalidOperator: '+980494882982'
  },
  shortEdrpou: '1234567',
  shortTaxNumber: '123'
};

export const invalidPhoneScenarios = [
  {
    description: 'less than 9 digits after +380',
    phoneNumber: '+38012345678'
  },
  {
    description: 'non-existent operator code in Ukraine',
    phoneNumber: '+380494882982'
  },
  {
    description: 'contains letters',
    phoneNumber: '+380abc123456'
  },
  {
    description: 'empty phone number',
    phoneNumber: ''
  }
];

export const taxValidationScenarios = [
  {
    customerType: CUSTOMER_TYPES.INDIVIDUAL_ENTREPRENEUR,
    fieldLabel: FIELD_LABELS.TAX_NUMBER_FOP
  },
  {
    customerType: CUSTOMER_TYPES.PRIVATE_PERSON,
    fieldLabel: FIELD_LABELS.TAX_NUMBER_PRIVATE
  }
];

export const nameFieldsData = [
  { label: FIELD_LABELS.LAST_NAME, expectedError: texts.lastNameLettersError },
  { label: FIELD_LABELS.FIRST_NAME, expectedError: texts.firstNameLettersError },
  { label: FIELD_LABELS.MIDDLE_NAME, expectedError: texts.middleNameLettersError }
];
