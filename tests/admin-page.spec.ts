import { test } from '../utils/fixtures';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { createUser, TestDataGenerator } from "../utils/test-helpers";

test.describe('Admin Panel', () => {

  const fakeFirstName = faker.person.firstName();
  const fakeLastName = faker.person.lastName();
  const fakePhone = `+38066${faker.string.numeric(7)}`;

  test.beforeEach(async ({ loggedInAdmin }) => {
    await loggedInAdmin.userPanel.waitFor({ state: 'visible' });
    expect(loggedInAdmin.userPanel).toBeVisible();
  });

  test('С419: Users menu section functionality', async ({ loggedInAdmin }) => {
    await loggedInAdmin.navigateToUsers();
    const title = loggedInAdmin.pageTitle;

    await expect(title).toBeVisible({ timeout: 5000 });
    await expect(title).toHaveText('Користувачі');
  });

  test('C420: Creating a user, C426: Delete function', async ({ loggedInAdmin }) => {
    await loggedInAdmin.navigateToUsers();
    await loggedInAdmin.addNewUser();
    expect(loggedInAdmin.addUserPanel).toBeVisible();
    await loggedInAdmin.selectUserGroupManagement();

    const fakeEmail = TestDataGenerator.safeEmail();
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

  test('C424: Admin can view the user', async ({ loggedInAdmin }) => {
    await loggedInAdmin.navigateToUsers();
    await loggedInAdmin.viewUser();
    await loggedInAdmin.verifyUserPageTitle();
  });

  test('C425: Editing user', async ({ loggedInAdmin }) => {
    const newUser = await createUser(loggedInAdmin);

    await loggedInAdmin.searchField.fill(newUser.email);
    await loggedInAdmin.waitForUserRowByEmail(newUser.email);
    await loggedInAdmin.editUser(newUser.email);
    await loggedInAdmin.userContainer.waitFor({ state: 'visible' });

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
      await loggedInAdmin.waitForPaginationUpdate();
      await loggedInAdmin.waitForUserRowsToLoad(option);

      expect(await loggedInAdmin.getSelectedPaginationValue()).toBe(option.toString());

      const actualRowsCount = await loggedInAdmin.getUserRowsCount();
      expect(actualRowsCount).toBeLessThanOrEqual(option);
      expect(actualRowsCount).toBeGreaterThan(0);

      const paginationDetails = await loggedInAdmin.getPaginationDetails();
      expect(paginationDetails.from).toBe(1);
      expect(actualRowsCount).toBe(paginationDetails.to - paginationDetails.from + 1);
    }
  });
});
