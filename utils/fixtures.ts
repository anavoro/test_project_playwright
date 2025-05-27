import { test as base } from '@playwright/test';
import { AdminPage } from '../pages/adminPage';
import 'dotenv/config';

type MyFixtures = {
  loggedInAdmin: AdminPage;
};

export const test = base.extend<MyFixtures>({
  loggedInAdmin: async ({ page }, use) => {

    const adminPage = new AdminPage(page);
    const adminEmail = process.env.ADMIN_EMAIL!;
    const adminPassword = process.env.ADMIN_PASSWORD!;

    await page.goto('https://dev.rentzila.com.ua/admin/');
    await adminPage.login(adminEmail, adminPassword);

    await use(adminPage);
  },
});
