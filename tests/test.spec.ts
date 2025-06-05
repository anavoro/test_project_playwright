import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test.describe('Home Page Verification', () => {
  test('should verify all required elements are present on the home page', async ({ page }) => {
    const homePage = new HomePage(page);
    await page.setViewportSize({ width: 1536, height: 864 });
    
    await homePage.goto('/');
    
    await page.waitForLoadState('networkidle');

    await homePage.verifyHomePageLoaded();
    
  });
});