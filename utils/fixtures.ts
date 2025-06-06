import { test as base } from '@playwright/test';
import { AdminPage } from '../pages/adminPage';
import { AdminCategoryPage } from '../pages/adminCategoryPage';
import { AdminManufacturerPage } from '../pages/adminManufacturerPage';
import 'dotenv/config';

type MyFixtures = {
  loggedInAdmin: AdminPage;
  adminCategoryPage: AdminCategoryPage;
  adminManufacturerPage: AdminManufacturerPage;
};

export const test = base.extend<MyFixtures>({
  loggedInAdmin: async ({ page }, use) => {
    const adminPage = new AdminPage(page);
    const adminEmail = process.env.ADMIN_EMAIL!;
    const adminPassword = process.env.ADMIN_PASSWORD!;
    const adminUrl = process.env.ADMIN_URL!;
    
    await page.goto(adminUrl);
    await adminPage.login(adminEmail, adminPassword);
    await use(adminPage);
  },
  
  adminCategoryPage: async ({ page, loggedInAdmin }, use) => {
    const adminCategoryPage = new AdminCategoryPage(page);
    await use(adminCategoryPage);
  },

  adminManufacturerPage: async ({ page, loggedInAdmin}, use) => {
    const adminManufacturerPage = new AdminManufacturerPage(page);
    await use(adminManufacturerPage);
  }
});