import { test as base } from '@playwright/test';
import { AdminPage } from '../pages/adminPage';

type MyFixtures = {
  loggedInAdmin: AdminPage;
};

export const test = base.extend<MyFixtures>({
  loggedInAdmin: async ({ page }, use) => {

    const adminPage = new AdminPage(page);
    await page.goto('https://dev.rentzila.com.ua/admin/');
    await adminPage.login('txt2021@ukr.net', 'Qwerty123+');

    await use(adminPage);
  },
});
