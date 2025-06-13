import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';
import type { PaginationDetails } from '../utils/types';

export abstract class AbstractAdminTablePage extends BasePage {
  // ---------------- Locators ----------------
  readonly search: Locator;
  readonly deleteBtn: Locator;
  readonly confirmBtn: Locator;
  readonly idSortingBtn: Locator;
  readonly nameSortingBtn: Locator;
  readonly sortDirectionIndicator: Locator;
  readonly idCells: Locator;
  readonly nameCells: Locator;
  readonly paginationDropdown: Locator;
  readonly paginationInfo: Locator;

  // ---------------- Abstract Locators ----------------
  abstract readonly dataRow: Locator;
  abstract readonly createBtn: Locator;

  constructor(page: Page) {
    super(page);

    this.search = page.getByTestId('input');
    this.deleteBtn = page.getByTestId('bucketBtn');
    this.confirmBtn = page.getByRole('button', { name: 'Так' });
    this.idSortingBtn = page.getByRole('button', { name: 'ID' });
    this.nameSortingBtn = page.getByRole('button', { name: 'Назва' });
    this.sortDirectionIndicator = page.locator('span.css-trfuzi');
    this.idCells = page.locator('th[scope="row"][id^="enhanced-table-checkbox"]');
    this.nameCells = page.locator('td.MuiTableCell-alignLeft');
    this.paginationDropdown = page.locator('.MuiTablePagination-select');
    this.paginationInfo = page.locator('.MuiTablePagination-displayedRows');
  }

  // ---------------- Abstract Methods ----------------
  abstract createItem(name?: string): Promise<string>;
  abstract clickCreate(): Promise<void>;

  // ---------------- Search ----------------
  async searchByTerm(searchTerm: string): Promise<void> {
    await this.search.fill(searchTerm);
  }

  // ---------------- Deletion ----------------
  async deleteByName(name: string): Promise<void> {
    await this.getRowByName(name).locator(this.deleteBtn).click();
    await this.confirmBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  // ---------------- Row Helpers ----------------
  getRowByName(name: string): Locator {
    return this.dataRow.filter({ hasText: name });
  }

  // ---------------- Sorting: UI Actions ----------------
  async clickIdSort(): Promise<void> {
    await this.idSortingBtn.click();
  }

  async clickNameSort(): Promise<void> {
    await this.nameSortingBtn.click();
  }

  async getIdValues(): Promise<number[]> {
    const idCells = await this.idCells.allTextContents();
    return idCells.map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id));
  }

  async getNameValues(): Promise<string[]> {
    const nameCells = await this.nameCells.allTextContents();
    return nameCells.map(name => name.trim()).filter(name => name.length > 0);
  }

  // ---------------- Sorting: Helpers & Verifiers ----------------
  async getSortedIdValues(): Promise<{ asc: number[]; desc: number[] }> {
    return this.getSortedValues(() => this.clickIdSort(), () => this.getIdValues());
  }

  async getSortedNameValues(): Promise<{ asc: string[]; desc: string[] }> {
    return this.getSortedValues(() => this.clickNameSort(), () => this.getNameValues());
  }

  async getSortedValues<T extends number | string>(
    clickSort: () => Promise<void>,
    getValues: () => Promise<T[]>
  ): Promise<{ asc: T[]; desc: T[] }> {
    await clickSort();
    const asc = await getValues();

    await clickSort();
    const desc = await getValues();

    return { asc, desc };
  }

  isSortedAscending<T extends number | string>(arr: T[], type: 'number' | 'string' = 'number'): boolean {
    return arr.every((val, i, a) =>
      i === 0 ? true :
        type === 'number'
          ? (val as number) >= (a[i - 1] as number)
          : (val as string).localeCompare(a[i - 1] as string) >= 0
    );
  }

  isSortedDescending<T extends number | string>(arr: T[], type: 'number' | 'string' = 'number'): boolean {
    return arr.every((val, i, a) =>
      i === 0 ? true :
        type === 'number'
          ? (val as number) <= (a[i - 1] as number)
          : (val as string).localeCompare(a[i - 1] as string) <= 0
    );
  }

  // ---------------- Pagination: UI Actions ----------------
  async selectPaginationOption(option: number): Promise<void> {
    await this.paginationDropdown.click();
    await this.page.locator(`[data-value="${option}"]`).click();
    await this.page.waitForTimeout(500); // small wait for UI update
  }

  async getSelectedPaginationValue(): Promise<string> {
    return (await this.paginationDropdown.textContent()) || '';
  }

  async getPaginationInfoText(): Promise<string> {
    return (await this.paginationInfo.textContent()) || '';
  }

  // ---------------- Pagination: Helpers ----------------
  async getRowsCount(): Promise<number> {
    await this.dataRow.first().waitFor({ state: 'visible' });
    return await this.dataRow.count();
  }

  async getPaginationDetails(): Promise<PaginationDetails> {
    const paginationText = await this.getPaginationInfoText();
    const match = paginationText.match(/Показано з (\d+) по (\d+) з (\d+)/);
    if (!match) {
      throw new Error(`Unable to parse pagination text: ${paginationText}`);
    }

    return {
      from: parseInt(match[1], 10),
      to: parseInt(match[2], 10),
      total: parseInt(match[3], 10),
    };
  }

  async waitForPaginationUpdate(): Promise<void> {
    await expect(this.paginationInfo).not.toHaveText(/з 0 по 0 з 0/, { timeout: 10000 });
    await this.dataRow.first().waitFor({ state: 'visible' });
  }

  // ---------------- Item Existence Verifiers ----------------

  async itemExists(name: string): Promise<boolean> {
    return (await this.getRowByName(name).count()) > 0;
  }

  getItemRow(name: string): Locator {
    return this.getRowByName(name);
  }
}
