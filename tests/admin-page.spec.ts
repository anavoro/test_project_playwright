import { test } from '../utils/fixtures';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker'
import { createUser, TestDataGenerator } from "../utils/test-helpers";

test.describe('Admin Panel', () => {
  test.beforeEach(async ({ loggedInAdmin }) => {
    await loggedInAdmin.userPanel.waitFor({ state: 'visible' });
    expect(loggedInAdmin.userPanel).toBeVisible();
  });

  test('С419: Users menu section functionality', async ({ loggedInAdmin }) => {
    await loggedInAdmin.navigateToUsers();
    await loggedInAdmin.verifyPageTitle("Користувачі");
    expect(loggedInAdmin.getPage()).toHaveURL('https://dev.rentzila.com.ua/admin/users/');
  });

  test('C420: Creating a user, C426: Delete function', async ({ loggedInAdmin }) => {
    await loggedInAdmin.navigateToUsers();
    await loggedInAdmin.addNewUser();
    expect(loggedInAdmin.addUserPanel).toBeVisible();
    await loggedInAdmin.selectUserGroupManagement();

    const fakeEmail = TestDataGenerator.safeEmail();
    const fakeFirstName = faker.person.firstName();
    const fakeLastName = faker.person.lastName();
    const fakePhone = `+38066${faker.string.numeric(7)}`;
    const password = TestDataGenerator.compliantPassword(12);

    await loggedInAdmin.fillUserForm({
      lastName: fakeLastName,
      firstName: fakeFirstName,
      phone: fakePhone,
      email: fakeEmail,
      password: password,
    });
    await loggedInAdmin.clickSort('Дата реєстрації');
    await loggedInAdmin.waitForTimeout(1000);
    expect(loggedInAdmin.getUserRowByEmailLocator(fakeEmail)).toBeVisible();
    await loggedInAdmin.deleteUserByEmail(fakeEmail);
  });

  test('C421: Filter button functionality', async ({ loggedInAdmin }) => {
    await loggedInAdmin.navigateToUsers();
   await loggedInAdmin.selectGroupClient();
   await loggedInAdmin.verifyAllFilteredUsersAreClients();
    });
  
  test('C422: Search functionality', async ({ loggedInAdmin }) => {
    await loggedInAdmin.navigateToUsers();
    await loggedInAdmin.searchField.fill('Володимир');
    await loggedInAdmin.verifyAllFilteredUsersHaveName('Володимир');
  });

  test('C423: Sorting by Date', async ({ loggedInAdmin }) => {
    await loggedInAdmin.navigateToUsers();
    await loggedInAdmin.clickSort('Дата реєстрації');
  
    await expect.poll(async () => {
      const dates = await loggedInAdmin.getColumnDataByHeaderText('Дата реєстрації');
      return loggedInAdmin.verifyDatesAreSortedDescending(dates);
    }, { timeout: 10000 }).toBe(true);

    await loggedInAdmin.clickSort('Дата реєстрації');
    await expect.poll(async () => {
      const dates = await loggedInAdmin.getColumnDataByHeaderText('Дата реєстрації');
      return loggedInAdmin.verifyDatesAreSortedAscending(dates);
    }, { timeout: 10000 }).toBe(true);
  });

  test('C423a: Sorting by Login', async ({ loggedInAdmin }) => {
    await loggedInAdmin.navigateToUsers();
    await loggedInAdmin.clickSort('Логін');
  
    await expect.poll(async () => {
      const logins = await loggedInAdmin.getColumnDataByHeaderText('Логін');
      return loggedInAdmin.verifyLoginsAreSortedDescending(logins);
    }, { timeout: 10000 }).toBe(true);
  
    await loggedInAdmin.clickSort('Логін');
    await expect.poll(async () => {
      const logins = await loggedInAdmin.getColumnDataByHeaderText('Логін');
      return loggedInAdmin.verifyLoginsAreSortedAscending(logins);
    }, { timeout: 10000 }).toBe(true);
  });
  
  test('C423b: Sorting by Username', async ({ loggedInAdmin }) => {
    await loggedInAdmin.navigateToUsers();
    await loggedInAdmin.clickSort('Ім\'я користувача');
  
    await expect.poll(async () => {
      const usernames = await loggedInAdmin.getColumnDataByHeaderText('Ім\'я користувача');
      return loggedInAdmin.verifyUsernamesAreSortedDescending(usernames);
    }, { timeout: 10000 }).toBe(true);
  
    await loggedInAdmin.clickSort('Ім\'я користувача');
    await expect.poll(async () => {
      const usernames = await loggedInAdmin.getColumnDataByHeaderText('Ім\'я користувача');
      return loggedInAdmin.verifyUsernamesAreSortedAscending(usernames);
    }, { timeout: 10000 }).toBe(true);
  });

test('C424: Admin can view the user', async ({loggedInAdmin}) => {
  await loggedInAdmin.navigateToUsers();
  await loggedInAdmin.viewUser();
  await loggedInAdmin.verifyUserPageTitle();
});

test('C425: Editing user', async ({loggedInAdmin}) => {
  const newUser = await createUser(loggedInAdmin);
  await loggedInAdmin.searchField.fill(newUser.email);
  await loggedInAdmin.waitForUserRowByEmail(newUser.email);
  await loggedInAdmin.editUser(newUser.email);
  await loggedInAdmin.userContainer.waitFor({ state: 'visible' });
  const fakeFirstName = faker.person.firstName();
  const fakeLastName = faker.person.lastName();
  const fakePhone = `+38066${faker.string.numeric(7)}`;
  
  await loggedInAdmin.editUserForm({
    lastName: fakeLastName,
    firstName: fakeFirstName,
    phone: fakePhone,
  });
  await loggedInAdmin.searchField.fill(newUser.email);
  await loggedInAdmin.deleteUserByEmail(newUser.email);
});

test('C427: Admin can change pagination options and verify user display count', async ({ loggedInAdmin }) => {
  await loggedInAdmin.navigateToUsers();

  const paginationOptions = [10, 20, 50];

  for (const option of paginationOptions) {
    await loggedInAdmin.selectPaginationOption(option);
    await loggedInAdmin.verifyPaginationSelection(option);
    await loggedInAdmin.verifyUserRowsCount(option);
    await loggedInAdmin.verifyPaginationInfo(option);
  }
});

test('C431: Equipment menu section', async ({loggedInAdmin}) => {
   await loggedInAdmin.openTechnicMenu();
   await expect(loggedInAdmin.technicCategories).toBeVisible();
   await expect(loggedInAdmin.technicBrands).toBeVisible();

  await loggedInAdmin.technicCategories.click();
  await loggedInAdmin.verifyPageTitle('Категорії техніки');
  await loggedInAdmin.technicBrands.click();
  await loggedInAdmin.verifyPageTitle('Виробники техніки');
});
});
