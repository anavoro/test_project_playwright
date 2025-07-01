import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { AdminPage } from '../pages/adminPage';
import { AdminCategoryPage } from '../pages/adminCategoryPage';
import { AdminManufacturerPage } from '../pages/adminManufacturerPage';
import { CreateAnnouncementPage } from '../pages/createAnnouncementPage';
import 'dotenv/config';
import { LoginPage } from '../pages/loginPage';
import { ProfilePage } from '../pages/profilePage';

type MyFixtures = {
  loggedInAdmin: AdminPage;
  adminCategoryPage: AdminCategoryPage;
  adminManufacturerPage: AdminManufacturerPage;
  loggedInUser: HomePage;
  profilePage: ProfilePage;
  createAnnouncementPage: CreateAnnouncementPage;
  homePage: HomePage;
  loginPage: LoginPage;
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
  },
  
  loggedInUser: async ({ page }, use) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const testEmail = process.env.TEST_EMAIL!;
    const testPassword = process.env.TEST_PASSWORD!;
    await page.setViewportSize({ width: 1536, height: 864 });
    await homePage.goto("/");
    await homePage.clickLogin();
    await loginPage.login(testEmail, testPassword);
    await use(homePage);
  },

  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);
    await use(profilePage);
  },

  createAnnouncementPage: async ({ page }, use) => {
    const createAnnouncementPage = new CreateAnnouncementPage(page);
    await use(createAnnouncementPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  }
});
