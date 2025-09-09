import { faker } from '@faker-js/faker';
import { CreateAnnouncementPage } from '../pages/createAnnouncementPage';
import * as dotenv from 'dotenv';
dotenv.config();

export const baseUrlAPI = 'https://dev.rentzila.com.ua/api/'

export const text = {
    requiredField: 'Це поле обов’язкове',
    notLess10Symbols: /не менше 10 символів/,
    notMore100Symbols: /не більше 100 символів/,
    notMore25Symbols: /Введіть не більше 25 символів/,
    notMore15Symbols: /не більше 15 символів/,
    defaultAddress: /[^Київ/ && /Володимирська 21\/20]/,
    choosePlaceOnMap:/[^Виберіть/ && /^місце]/,
    notLess2Symbols: /має містити щонайменше дві літери/,
    onlyLetters: /має містити лише літери/,
    enterCorrectNumber: /Введіть коректний мобільний номер телефону/
    unitDoesntExist: 'The unit with this id does not exist',
    existingEmail: "Profile with this email already exists.",
    wrongFormatPass: "This password must contain at least 1 uppercase character, 1 lowercase character and 1 digit.",
    existingPhone: "Profile with this phone already exists.",
    landLinePhone: "You can`t use landline phone number. Use mobile number instead", main
}

export const color = {
    error: "rgb(247, 56, 89)",
    errorBorder: "1px solid rgb(247, 56, 89)",
    activeElem: "rgb(64, 75, 105)",
    inactiveElem: "rgb(196, 196, 196)",
    noErrorBorder: "1px solid rgb(229, 229, 229)",
}

export const validData = {
    email: process.env.USER_EMAIL ?? '',
    password: process.env.USER_PASSWORD ?? '',
    unitName: faker.string.alpha(10),
    letter: faker.string.alpha({casing: 'upper'}),
    text2: faker.string.fromCharacters('abc', 2),
    textDash: faker.string.fromCharacters('ab-crh', 2),
    text25: faker.string.fromCharacters('abcerdf', 25),
    cyrillic: faker.string.fromCharacters('фаглдч', 5),
    digits: (i: number) => faker.string.numeric(i),
}

export const invalidData ={
    space: " ",
    text101: faker.string.fromCharacters('abcw', 101),
    text26: faker.string.fromCharacters('abcwr', 26),
    text10: faker.string.fromCharacters('abcwr', 10),
    text9: faker.string.fromCharacters('abcwr', 9),
    textSpaceEnd: 'abcwr         ',
    textSpaceInside: faker.string.fromCharacters('abc wr', 10),
    text3: faker.string.fromCharacters('abc', 3),
    text1: faker.string.fromCharacters('abc', 1),
    symbols: faker.internet.password({length: 7, pattern: /[?$#&%@]/}),
    spaceInside: faker.string.octal({ length: 12, prefix: '123 ' }),
    spaceEnd: `${faker.string.numeric(15)} `,
    digitsSpaceEnd: `${faker.string.numeric(6)} `,
    digitsSpaceInside: faker.string.octal({ length: 3, prefix: '123 ' }),
    text9001: faker.string.fromCharacters('abcde ', 9001),
    fileType: "testData/photo/wrong_type.webp",
    fileSize: "testData/photo/wrong_size.jpg",
    digits: (i: number) => faker.string.numeric(i),
}

export const manufacturerRandom = async (createAnnouncementPage: CreateAnnouncementPage): Promise<any> => {
    await createAnnouncementPage.fillVehicleManufacturerInput('A');
    const manufacturer = await createAnnouncementPage.manufacturers.allInnerTexts()
    const vehicleManufactureRandom = manufacturer[Math.floor(Math.random()*manufacturer.length)]
    await createAnnouncementPage.fillVehicleManufacturerInput(vehicleManufactureRandom)
    return vehicleManufactureRandom
}

export const images = ['testData/photo/pic1.jpg', 'testData/photo/pic2.jpg', 'testData/photo/pic3.png', 'testData/photo/pic4.jpeg',
            'testData/photo/pic5.jpeg', 'testData/photo/pic6.jpeg','testData/photo/pic7.jpg','testData/photo/pic8.jpg', 'testData/photo/pic9.png',
            'testData/photo/pic10.png', 'testData/photo/pic11.jpeg', 'testData/photo/pic12.jpeg', 'testData/photo/pic13.jpg', 'testData/photo/pic14.jpg',
            'testData/photo/pic15.png', 'testData/photo/pic16.png'
        ]

export const fileChooserFunc = async (arg0: any, arg1: any, 
       createAnnouncementPage: CreateAnnouncementPage, page: { waitForEvent: any }) => {
        const fileChooserPromise = page.waitForEvent('filechooser');
        await createAnnouncementPage.clickImageBlock(arg0)
        const fileChooser = await fileChooserPromise;
        fileChooser.setFiles(arg1); 
        }

const services = ['буріння', 'вивіз', 'полив', 'посів', 'прибирання']
export const searchService: string = services[Math.floor(Math.random()*services.length)]

export const newService = async (): Promise<string> => {
    let n = faker.string.numeric(5)
    return `${searchService[0].toUpperCase()}${searchService.slice(1)} ${n}`;
}
export const adminCreds = {
    email: "txt2021@ukr.net",
    password: "Qwerty123+",
    phone: "+380XXXXXXXXX",
}
export const wrongCreds = {
    existingEmail: "newuser@test.com",
    password: "123qwerty",
    existingPhone: "+380951234567",
    landLinePhone: "+380441234567",
}
export const rightCreds = {
    email: "newuser@test.net",
    password: "123qwerty",
    phone: "+380631234567",
}

const ext = [50, 66, 95, 99,67, 68, 96, 97, 98, 63, 73, 93, 91, 92, 94]

export const mobileNumber = async (): Promise<string> => {
    const extRandom = ext[Math.floor(Math.random()*ext.length)]
    let a = faker.string.numeric(7)
       let phoneNumber = `${extRandom}${a}`
       return phoneNumber
}
