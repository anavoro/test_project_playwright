import { test } from '../utils/fixtures';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Admin Category Panel', () => {
  let createdCategoryName: string | undefined;

  test.beforeEach(async ({ loggedInAdmin }) => {
    await loggedInAdmin.adminPanel.waitFor({ state: 'visible' });
    expect(loggedInAdmin.adminPanel).toBeVisible();
    await loggedInAdmin.openTechnicMenu();
    await expect(loggedInAdmin.technicCategories).toBeVisible();
    await expect(loggedInAdmin.technicBrands).toBeVisible();
    await loggedInAdmin.technicCategories.click();
  });

  test.afterEach(async ({ adminCategoryPage }, testInfo) => {
    const skipCleanup = testInfo.annotations.some(
      (annotation) => annotation.type === 'skipCleanup'
    );
  
    if (!skipCleanup && createdCategoryName) {
      try {
        await adminCategoryPage.deleteCategoryByName(createdCategoryName);
        await adminCategoryPage.search.fill(createdCategoryName);
        const categoryRow = adminCategoryPage.getCategoryRowByName(createdCategoryName);
        await expect(categoryRow).not.toBeVisible();
      } catch (error) {
        throw new Error(`Cleanup failed for category "${createdCategoryName}": ${error}`);
      } finally {
        createdCategoryName = undefined;
      }
    }
  });  

  test('C431: Equipment menu section', {
    annotation: { type: 'skipCleanup', description: 'Navigation test - no cleanup needed' },
  }, async ({ loggedInAdmin }) => {
    await expect(loggedInAdmin.pageTitle).toBeVisible({ timeout: 5000 });
    await expect(loggedInAdmin.pageTitle).toHaveText('Категорії техніки');

    await loggedInAdmin.technicBrands.click();
    await expect(loggedInAdmin.pageTitle).toBeVisible({ timeout: 5000 });
    await expect(loggedInAdmin.pageTitle).toHaveText('Виробники техніки');
  });

  test('C435: View category and verify details', {
    annotation: { type: 'skipCleanup', description: 'Read-only test - no cleanup needed' },
  }, async ({ adminCategoryPage }) => {
    const categoryName = await adminCategoryPage.getFirstCategoryName();
    await adminCategoryPage.openFirstCategoryView();
    await expect(adminCategoryPage.popup).toBeVisible();

    const popupLabel = await adminCategoryPage.getPopupLabel();
    expect(popupLabel).toBe('Перегляд категорії');

    const popupName = await adminCategoryPage.getPopupName();
    expect(popupName).toBe(categoryName);

    await adminCategoryPage.closeViewPopup();
    await expect(adminCategoryPage.popup).toBeHidden();
  });

  test('C432: Create a category', async ({ adminCategoryPage }) => {
    createdCategoryName = await adminCategoryPage.createCategory();
    await adminCategoryPage.search.fill(createdCategoryName);
    const categoryRow = adminCategoryPage.getCategoryRowByName(createdCategoryName);
    await expect(categoryRow).toBeVisible();
  });

  test('C436: Edit a category', async ({ adminCategoryPage }) => {
    createdCategoryName = await adminCategoryPage.createCategory();
    await adminCategoryPage.search.fill(createdCategoryName);
    const categoryRow = adminCategoryPage.getCategoryRowByName(createdCategoryName);
    await expect(categoryRow).toBeVisible();

    await adminCategoryPage.clickEdit();
    const newCategoryName = `Категорія ${faker.string.numeric(2)}`;
    await adminCategoryPage.categoryInput.fill(newCategoryName);
    await adminCategoryPage.parentCategory.click();
    await adminCategoryPage.editedCategory.click();
    await adminCategoryPage.saveBtn.click();

    createdCategoryName = newCategoryName;
    await adminCategoryPage.search.fill(createdCategoryName);
    const updatedRow = adminCategoryPage.getCategoryRowByName(createdCategoryName);
    await expect(updatedRow).toBeVisible();
  });

  test('C437: Delete a category', {
    annotation: { type: 'skipCleanup', description: 'Test deletes category itself' },
  }, async ({ adminCategoryPage }) => {
    createdCategoryName = await adminCategoryPage.createCategory();
    await adminCategoryPage.search.fill(createdCategoryName);
    await adminCategoryPage.deleteCategoryByName(createdCategoryName);
    await adminCategoryPage.search.fill(createdCategoryName);
    const categoryRow = adminCategoryPage.getCategoryRowByName(createdCategoryName);
    await expect(categoryRow).not.toBeVisible();
  });

  test('C499: Search for category', async ({ adminCategoryPage }) => {
    createdCategoryName = await adminCategoryPage.createCategory();
    await adminCategoryPage.search.fill(createdCategoryName);
    const categoryRow = adminCategoryPage.getCategoryRowByName(createdCategoryName);
    await expect(categoryRow).toBeVisible();
  });

  test('C439: should sort ID and Name columns', {
    annotation: { type: 'skipCleanup', description: 'No category created' },
  }, async ({ adminManufacturerPage }) => {
    const id = await adminManufacturerPage.getSortedIdValues();
    expect(adminManufacturerPage.isSortedAscending(id.asc, 'number')).toBe(true);
    expect(adminManufacturerPage.isSortedDescending(id.desc, 'number')).toBe(true);
    const name = await adminManufacturerPage.getSortedNameValues();
    expect(adminManufacturerPage.isSortedAscending(name.asc, 'string')).toBe(true);
    expect(adminManufacturerPage.isSortedDescending(name.desc, 'string')).toBe(true);
  });

  test('C434: Admin can change pagination options and verify user display count', {
    annotation: { type: 'skipCleanup', description: 'Pagination test - navigates to users page' },
  }, async ({ adminCategoryPage }) => {
    const paginationOptions = [10, 20, 50];

    for (const option of paginationOptions) {
      await adminCategoryPage.selectPaginationOption(option);
      await adminCategoryPage.waitForPaginationUpdate();
      expect(await adminCategoryPage.getSelectedPaginationValue()).toBe(option.toString());

      const actualRowsCount = await adminCategoryPage.getRowsCount();
      expect(actualRowsCount).toBeLessThanOrEqual(option);
      expect(actualRowsCount).toBeGreaterThan(0);

      const paginationDetails = await adminCategoryPage.getPaginationDetails();
      expect(paginationDetails.from).toBe(1);
      expect(actualRowsCount).toBe(paginationDetails.to - paginationDetails.from + 1);
    }
  });
});

test.describe('Admin Manufacturer Page', () => {
  test.beforeEach(async ({ loggedInAdmin }) => {
    await loggedInAdmin.adminPanel.waitFor({ state: 'visible' });
    expect(loggedInAdmin.adminPanel).toBeVisible();
    await loggedInAdmin.openTechnicMenu();
    await expect(loggedInAdmin.technicCategories).toBeVisible();
    await expect(loggedInAdmin.technicBrands).toBeVisible();
    await loggedInAdmin.technicBrands.click();
  });

  test('C438: Create a Manufacturer', async ({ adminManufacturerPage }) => {
    await adminManufacturerPage.clickCreate();
    const manufacturerName = await adminManufacturerPage.fillManufacturerName();
    await adminManufacturerPage.clickSubmit();
    await adminManufacturerPage.searchManufacturer(manufacturerName);
    const manufacturerRow = adminManufacturerPage.getManufacturerRow(manufacturerName);
    await expect(manufacturerRow).toBeVisible();

    await adminManufacturerPage.deleteManufacturerByName(manufacturerName);
    const deletedManufacturerRow = adminManufacturerPage.getManufacturerRow(manufacturerName);
    await expect(deletedManufacturerRow).toHaveCount(0, { timeout: 7000 });
  });

  test('C439: should sort ID and Name columns', async ({ adminManufacturerPage }) => {
    const id = await adminManufacturerPage.getSortedIdValues();
    expect(adminManufacturerPage.isSortedAscending(id.asc, 'number')).toBe(true);
    expect(adminManufacturerPage.isSortedDescending(id.desc, 'number')).toBe(true);

    const name = await adminManufacturerPage.getSortedNameValues();
    expect(adminManufacturerPage.isSortedAscending(name.asc, 'string')).toBe(true);
    expect(adminManufacturerPage.isSortedDescending(name.desc, 'string')).toBe(true);
  });

  test('C498: Search Manufacturer', async ({ adminManufacturerPage }) => {
    const newManufacturer = await adminManufacturerPage.createManufacturer();
    await adminManufacturerPage.search.fill(newManufacturer);
    const manufacturerRow = adminManufacturerPage.getManufacturerRowByName(newManufacturer);
    await expect(manufacturerRow).toBeVisible();
  });
});
