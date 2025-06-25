import { faker } from '@faker-js/faker';
import { format, addHours, addDays } from 'date-fns';
import { validServiceNames, ukraineCities } from '../constants/tendersData';

const startDate = addHours(new Date(), 1);
const endDateRaw = addHours(startDate, 24);
const periodStart = faker.date.between({from: addDays(endDateRaw, 1), to: addDays(endDateRaw, 7),});
const periodEnd = faker.date.between({from: addDays(periodStart, 1), to: addDays(periodStart, 10),});
const roundToHalfHour = (date: Date): Date => new Date(date.setHours(date.getMinutes() < 30 ? date.getHours() : date.getHours() + 1, date.getMinutes() < 30 ? 30 : 0, 0, 0));
const endDate = roundToHalfHour(endDateRaw);


export const validTenderValues = {
  tenderName: faker.lorem.words(5),
  serviceName: faker.helpers.arrayElement(validServiceNames),
  endDate: format(endDate, 'd HH:mm'),
  periodOfWork: {
    start: format(periodStart, 'd'),
    end: format(periodEnd, 'd'),
  },
  budget: faker.number.int({ min: 1, max: 100000 }).toString(),
  city: faker.helpers.arrayElement(ukraineCities),
  info: faker.lorem.sentence(10).slice(0, 60),
};

export const invalidTenderValues = {
  tenderName: {
    lessThenTen: faker.string.alpha({ length: 9 }),
    withRestrictedSymbol: {
      lessThan: faker.string.alpha({ length: 10 }) + '<',
      greaterThan: faker.string.alpha({ length: 10 }) + '>',
      openBrace: faker.string.alpha({ length: 10 }) + '{',
      closeBrace: faker.string.alpha({ length: 10 }) + '}',
      semicolon: faker.string.alpha({ length: 10 }) + ';',
      caret: faker.string.alpha({ length: 10 }) + '^',
    },
    with71Symbol: faker.string.alpha({ length: 71 }),
  },
  serviceName: {
    withRestrictedSymbol: {
      lessThan: faker.helpers.arrayElement(validServiceNames) + '<',
      greaterThan: faker.helpers.arrayElement(validServiceNames) + '>',
      openBrace: faker.helpers.arrayElement(validServiceNames) + '{',
      closeBrace: faker.helpers.arrayElement(validServiceNames) + '}',
      semicolon: faker.helpers.arrayElement(validServiceNames) + ';',
      caret: faker.helpers.arrayElement(validServiceNames) + '^',
    },
    with101Symbol: faker.helpers.arrayElement(validServiceNames).replace(/\s+/g, '').repeat(10).slice(0, 101),
  },
  endDateLessThan24H: format(new Date(endDate.getTime() - 30 * 60 * 1000), 'd h:mm'),
  endDateCurrent: format(new Date(), 'd'),
  nextDay: format(addDays(new Date(), 1), 'd'),
  secondDay: format(addDays(new Date(), 2), 'd'),
  budget: {
    withRestrictedSymbol: {
      quotation: '"' + faker.number.int({ max: 99999}) + '"',
      apostrophe: '`' + faker.number.int({ max: 99999}) + '`',
      lessThanGreaterThan: '<' + faker.number.int({ max: 99999}) + '>',
      curlyBrace: '{' + faker.number.int({ max: 99999}) + '}',
      semicolon: ';' + faker.number.int({ max: 99999}) + ';',
      caret: '^' + faker.number.int({ max: 99999}) + '^',
    },
    moreThan9: faker.string.numeric({ length: { min: 10, max: 15 } }),
  },
  info: {
    thirtyNineSymbols: faker.string.alpha({ length: 39 }),
    withRestrictedSymbol: {
      lessThan: faker.lorem.sentence(10).slice(0, 60) + '<',
      greaterThan: faker.lorem.sentence(10).slice(0, 60) + '>',
      openBrace: faker.lorem.sentence(10).slice(0, 60) + '{',
      closeBrace: faker.lorem.sentence(10).slice(0, 60) + '}',
      semicolon: faker.lorem.sentence(10).slice(0, 60) + ';',
      caret: faker.lorem.sentence(10).slice(0, 60) + '^',
    },
  }
}

export function generateRandomLargeFiles(count: number): {
  name: string;
  mimeType: string;
  buffer: Buffer;
}[] {
  const extensions = ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'zip'];
  const mimeMap: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    zip: 'application/zip',
  };

  const files = [];

  for (let i = 0; i < count; i++) {
    const ext = extensions[Math.floor(Math.random() * extensions.length)];
    const mimeType = mimeMap[ext];
    const buffer = Buffer.alloc(21 * 1024 * 1024, 'x');

    files.push({
      name: `file-${i + 1}.${ext}`,
      mimeType,
      buffer,
    });
  }

  return files;
}

export function generateInvalidFormatFiles(count: number): {
  name: string;
  mimeType: string;
  buffer: Buffer;
}[] {
  const extensions = ['gif', 'rar', 'mp4', 'mp3', 'txt'];
  const mimeMap: Record<string, string> = {
    gif: 'image/gif',
    rar: 'application/x-rar-compressed',
    mp4: 'video/mp4',
    mp3: 'audio/mpeg',
    txt: 'text/plain',
  };

  const files = [];

  for (let i = 0; i < count; i++) {
    const ext = extensions[Math.floor(Math.random() * extensions.length)];
    const mimeType = mimeMap[ext];
    const sizeInMB = 3 + Math.random() * 2; 
    const sizeInBytes = Math.floor(sizeInMB * 1024 * 1024);

    const buffer = Buffer.alloc(sizeInBytes, 'x');

    files.push({
      name: `file-${i + 1}.${ext}`,
      mimeType,
      buffer,
    });
  }

  return files;
}

export function generateValidFiles(count: number): {
  name: string;
  mimeType: string;
  buffer: Buffer;
}[] {
  const extensions = ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'zip'];
  const mimeMap: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    zip: 'application/zip',
  };

  const files = [];

  for (let i = 0; i < count; i++) {
    const ext = extensions[Math.floor(Math.random() * extensions.length)];
    const mimeType = mimeMap[ext];
    const sizeInMB = 3 + Math.random() * 2;
    const sizeInBytes = Math.floor(sizeInMB * 1024 * 1024);

    const buffer = Buffer.alloc(sizeInBytes, 'x');

    files.push({
      name: `file-${i + 1}.${ext}`,
      mimeType,
      buffer,
    });
  }

  return files;
}