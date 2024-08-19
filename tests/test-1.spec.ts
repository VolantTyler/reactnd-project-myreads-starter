import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('li').filter({ hasText: 'Move to...Currently ReadingWant to ReadReadNoneThe Linux Command LineWilliam E' }).getByRole('combobox').selectOption('wantToRead');
});