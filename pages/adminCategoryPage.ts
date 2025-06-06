import { Page, Locator, expect } from '@playwright/test';
import { AbstractAdminTablePage } from './abstractAdminTablePage';
import { faker } from '@faker-js/faker';

export class AdminCategoryPage extends AbstractAdminTablePage {
  readonly createBtn: Locator;
  readonly dataRow: Locator;
  readonly categoryInput: Locator;
  readonly parentCategory: Locator;
  readonly categoryList: Locator;
  readonly selectedCategory: Locator;
  readonly saveBtn: Locator;
  readonly viewCategoryButton: Locator;
  readonly popup: Locator;
  readonly popupLabel: Locator;
  readonly popupName: Locator;
  readonly popupCloseButton: Locator;
  readonly editBtn: Locator;
  readonly editedCategory: Locator;

  constructor(page: Page) {
    super(page);

    this.createBtn = page.getByTestId('customButtonContainer');
    this.dataRow = page.locator('tr[role="checkbox"]');
    this.categoryInput = page.getByTestId('custom-input');
    this.parentCategory = page.getByTestId('div_CustomSelect');
    this.categoryList = page.getByTestId('listItems-customSelect');
    this.selectedCategory = page.getByTestId('item-customSelect');
    this.saveBtn = page.getByRole('button', { name: 'Зберегти' });
    this.viewCategoryButton = page.getByTestId('adminOkoButton');
    this.popup = page.getByTestId('content');
    this.popupLabel = page.locator('.PopupLayout_label__pmlul');
    this.popupName = page.locator('.AdminCategoryPopup_field___enMa');
    this.popupCloseButton = page.getByTestId('crossIcon');
    this.editBtn = page.getByTestId('adminPenBtn');
    this.editedCategory = page.locator('[data-testid="span-customSelect"]:text-is("Комунальна техніка")');
  }

  // ---------------- Category Creation ----------------
  async clickCreate(): Promise<void> {
    await this.createBtn.click();
  }

  async selectRandomCategory(): Promise<void> {
    await this.parentCategory.click();
    await this.categoryList.isVisible();
    await expect(async () => {
      const count = await this.selectedCategory.count();
      expect(count).toBeGreaterThanOrEqual(10);
    }).toPass({ timeout: 10000 });
    
    const count = await this.selectedCategory.count();
    const randomIndex = Math.floor(Math.random() * (count - 1)) + 1;
    await this.selectedCategory.nth(randomIndex).click();
  }

  async createItem(name?: string): Promise<string> {
    return this.createCategory(name);
  }

  async createCategory(name?: string): Promise<string> {
    const inputCategory = name || `Категорія ${faker.string.alphanumeric(6)}`;
    await this.clickCreate();
    await this.categoryInput.fill(inputCategory);
    await this.selectRandomCategory();
    await this.saveBtn.click();
    return inputCategory;
  }

  // ---------------- Category methods ---------------------------
  async deleteCategoryByName(categoryName: string): Promise<void> {
    await this.deleteByName(categoryName);
  }

  getCategoryRowByName(categoryName: string): Locator {
    return this.getRowByName(categoryName);
  }

  getCategoryRowByIndex(index: number): Locator {
    return this.getRowByIndex(index);
  }

  getCategoryNameFromRow(categoryRow: Locator): Promise<string> {
    return this.getNameFromRow(categoryRow);
  }

  // ---------------- View Category ---------------------------
  async openCategoryViewByIndex(index: number): Promise<void> {
    await this.viewCategoryButton.nth(index).click();
  }

  async openFirstCategoryView(): Promise<void> {
    await this.viewCategoryButton.first().click();
  }

  async getNameByIndex(index: number): Promise<string> {
    return (await this.nameCells.nth(index).textContent())?.trim() || '';
  }

  async getFirstCategoryName(): Promise<string> {
    return (await this.nameCells.first().textContent())?.trim() || '';
  }

  async getPopupName(): Promise<string> {
    return (await this.popupName.textContent())?.trim() || '';
  }
  
  async getPopupLabel(): Promise<string> {
    return (await this.popupLabel.textContent())?.trim() || '';
  }

  async closeViewPopup(): Promise<void> {
    await this.popupCloseButton.click();
    await expect(this.popup).toBeHidden();
  }

  async clickEdit(): Promise<void> {
    await this.editBtn.click();
  }

  async getTotalRowCount(): Promise<number> {
    return await this.viewCategoryButton.count();
  }
}
