// @ts-check
const { test, expect } = require('@playwright/test');

test('has page title and shelf titles', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page).toHaveTitle(/MyReads/);
  await expect(page.getByRole('heading', { name: 'Currently Reading'})).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Want to Read'})).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Previously Read'})).toBeVisible();
});


test('move book between shelves', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const book1 = page.getByTestId('book-list-item').nth(1)
  await expect(book1).toHaveClass('book')
  

});