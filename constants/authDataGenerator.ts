import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
dotenv.config();

const validPhone = process.env.USER_MOBILE ?? '';

const generateCyrillic = (length: number): string => {
  const cyrillicChars = ['а','б','в','г','ґ','д','е','є','ж','з','и','і','ї','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ю','я'];
  return Array.from({ length }, () => faker.helpers.arrayElement(cyrillicChars)).join('');
};

const generateValidBasePassword = (): string => {
  const upper = faker.string.alpha({ casing: 'upper', length: 1 });
  const lower = faker.string.alpha({ casing: 'lower', length: 6 });
  const digits = faker.string.numeric(2);
  return `${upper}${lower}${digits}`;
};

const generateSimpleUsername = (): string => {
  const first = faker.person.firstName().toLowerCase();
  const last = faker.person.lastName().toLowerCase();
  return `${first}.${last}`;
};

export const tenderContact = {
  lastName: faker.person.lastName(),
  firstName: faker.person.firstName(),
  validMobile: process.env.USER_MOBILE?.replace(/^\+380/, '') ?? '',
};

export const invalidUserCredentials = {
  invalidEmails: {
    withSpace: `${generateSimpleUsername()} ${faker.internet.domainName()}`,
    inCyrillic: generateCyrillic(14),
    withoutAt: `${generateSimpleUsername()}${faker.internet.domainName()}`,
    withoutDot: `${generateSimpleUsername()}@gmailcom`,
    withoutCom: `${generateSimpleUsername()}@gmail`,
    withoutGmail: `${generateSimpleUsername()}@.com`,
    withoutDomen: generateSimpleUsername(),
    withDoubleAt: `${generateSimpleUsername()}@@gmail.com`,
  },
  invalidPasswords: {
    withSpaceAtTheEnd: generateValidBasePassword() + ' ',
    withSpaceAtTheBeginning: ' ' + generateValidBasePassword(),
    nonExistent: generateValidBasePassword().replace(/\d$/, faker.string.numeric(1)),
    withoutUpperCaseLetter: faker.string.alpha({ casing: 'lower', length: 7 }) + faker.string.numeric(2),
    withoutLowerCaseLetter: faker.string.alpha({ casing: 'upper', length: 7 }) + faker.string.numeric(2),
    inCyrillic: generateCyrillic(7) + faker.string.numeric(2),
  },
  invalidPhones: {
    withoutCountryCode: validPhone.replace('+380', ''),
    withoutLastNumber: validPhone.slice(0, -1),
    withHyphen: validPhone.replace(/(\+380)(\d{2})(\d{3})(\d{4})/, '$1-$2-$3-$4'),
    withSpaces: validPhone.replace(/(\+380)(\d{2})(\d{3})(\d{4})/, '$1 $2 $3 $4'),
    withParentheses: validPhone.replace(/(\+380)(\d{2})(\d{7})/, '$1($2)$3'),
    withoutCountryCodeWithParentheses: validPhone.replace('+380', '').replace(/(\d{2})(\d{7})/, '($1)$2'),
    with11Numbers: validPhone.replace('+380', '0') + '0',
    withOtherCountryCode: validPhone.replace('+380', '+1'),
    without38: validPhone.replace('+380', '+0'),
  },
  name: {
    oneSymbol: faker.string.alpha(),
    moreThan25: faker.string.alpha(26),
  },
  invalidPhonesForContact: {
      withRestrictedSymbol: {
        lessThan: validPhone + '<',
        greaterThan: validPhone + '>',
        openBrace: validPhone + '{',
        closeBrace: validPhone + '}',
        semicolon: validPhone + ';',
        caret: validPhone + '^',
        quotation: validPhone + '"',
        apostrophe: validPhone + '`',
      },
    }
};