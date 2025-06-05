import { faker } from '@faker-js/faker';
import { CreateAnnouncementPage } from '../pages/createAnnouncementPage';

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
    email: "my.lanauno@gmail.com",
    password: "345Qwerty",
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
}

export const manufacturerRandom = async (createAnnouncementPage: CreateAnnouncementPage): Promise<string> => {
    await createAnnouncementPage.fillVehicleManufacturerInput('A');
    const manufacturer = await createAnnouncementPage.manufacturers.allInnerTexts()
    const vehicleManufactureRandom: string = await manufacturer[Math.floor(Math.random()*manufacturer.length)]
    await createAnnouncementPage.fillVehicleManufacturerInput(vehicleManufactureRandom)
    return vehicleManufactureRandom
}
    
 
