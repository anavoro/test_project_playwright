import { faker } from '@faker-js/faker';
import { AdminPage } from '../pages/adminPage';

export class TestDataGenerator {
  static compliantPassword(length = 12): string {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const allChars = uppercase + lowercase + numbers;
    let password = 
      uppercase[Math.floor(Math.random() * uppercase.length)] +
      lowercase[Math.floor(Math.random() * lowercase.length)] +
      numbers[Math.floor(Math.random() * numbers.length)];

    while (password.length < length) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    return password
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');
  }

  static safeEmail(maxLength = 25): string {
    const domain = '@gmail.com'; 
    const localLength = maxLength - domain.length;
    const localPart = faker.string.alpha({ length: localLength, casing: 'mixed' });

    return `${localPart}${domain}`;
  }
}
  export async function createUser(adminPage: AdminPage) {
    await adminPage.navigateToUsers();
    await adminPage.addNewUser();
    await adminPage.selectUserGroupManagement();
  
    const email = TestDataGenerator.safeEmail();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const phone = `+38066${faker.string.numeric(7)}`;
    const password = TestDataGenerator.compliantPassword(12);
  
    await adminPage.fillUserForm({
      lastName,
      firstName,
      phone,
      email,
      password,
    });

    await adminPage.addUserPanel.waitFor({ state: 'hidden' });
    return { email, firstName, lastName, phone, password };
  }