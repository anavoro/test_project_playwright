import { faker } from '@faker-js/faker';
import { CreateAnnouncementPage } from '../pages/createAnnouncementPage';
import { Page } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export const text = {
    requiredField: "Це поле обов’язкове",
    notLess10Symbols: /не менше 10 символів/,
    notMore100Symbols: /не більше 100 символів/,
    notMore15Symbols: /не більше 15 символів/,
    defaultAddress: /[^Київ/ && /Володимирська 21\/20]/,
    choosePlaceOnMap:/[^Виберіть/ && /^місце]/,
}

export const color = {
    error: "rgb(247, 56, 89)",
    errorBorder: "1px solid rgb(247, 56, 89)",
    activeElem: "rgb(64, 75, 105)",
    inactiveElem: "rgb(196, 196, 196)",
}

export const validData = {
    email: process.env.USER_EMAIL ?? '',
    password: process.env.USER_PASSWORD ?? '',
    digits16: faker.string.numeric(16),
    unitName: faker.string.alpha(10),
    letter: faker.string.alpha({casing: 'upper'}),
}

export const invalidData ={
    space: " ",
    digits: faker.string.numeric(9),
    text101: faker.string.fromCharacters('abcw', 101),
    symbols: faker.internet.password({length: 7, pattern: /[?$#&%@]/}),
    spaceInside: faker.string.octal({ length: 12, prefix: '123 ' }),
    spaceEnd: `${faker.string.numeric(15)} + " "`,
    digits15: faker.string.numeric(15),
    text9001: faker.string.fromCharacters('abcde ', 9001),
    fileType: "testData/photo/wrong_type.webp",
    fileSize: "testData/photo/wrong_size.jpg",
}

export const manufacturerRandom = async (createAnnouncementPage: CreateAnnouncementPage): Promise<string> => {
    await createAnnouncementPage.fillVehicleManufacturerInput('A');
    const manufacturer = await createAnnouncementPage.manufacturers.allInnerTexts()
    const vehicleManufactureRandom: string = await manufacturer[Math.floor(Math.random()*manufacturer.length)]
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


    