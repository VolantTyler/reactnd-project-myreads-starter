// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/MyReads/);
  await expect(page.getByRole('heading', { name: 'Currently Reading'})).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Want to Read'})).toBeVisible();

});


