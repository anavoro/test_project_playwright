import {test as base} from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';

type MyFixtures = {
    loggedInAdmin: HomePage;
};

export const test = base.extend<MyFixtures>({
    loggedInAdmin: async ({page}, use) => {

  await page.setViewportSize({ width: 1536, height: 864 });
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  
  await page.goto('/');
  await homePage.clickLogin() 
  await loginPage.login("123@gmail.com", "12345Qwerty!")
  await use(homePage);
    }
})