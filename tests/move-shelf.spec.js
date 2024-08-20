// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("move shelf", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  test("has page title and shelf titles", async ({ page }) => {
    await expect(page).toHaveTitle(/MyReads/);
    await expect(
      page.getByRole("heading", { name: "Currently Reading" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Want to Read" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Previously Read" })
    ).toBeVisible();
  });

  test("move book between shelves", async ({ page }) => {
    const book1 = page.getByTestId("book-list-item").nth(1);
    await expect(book1).toHaveClass("book");

    const bookLinux = page
      .getByRole("listitem")
      .filter({ hasText: "The Linux Command Line" });
    await expect(bookLinux).toContainText("currentlyReading");
    await bookLinux.getByRole("combobox").selectOption("wantToRead");

    await expect(bookLinux).toContainText("wantToRead");
    await expect(bookLinux.getByText("wantToRead")).not.toBeVisible();
  });

  test("search for a book", async ({ page }) => {
    await page.getByRole("link", { name: "Add a book" }).click();
    await expect(page.url()).toContain("/search");

    await page.getByPlaceholder("Search by title or author").fill("literary");

    const bookLiterary = page
      .getByRole("listitem")
      .filter({ hasText: "Story in Literary Fiction" });
    await bookLiterary.getByRole("combobox").selectOption("wantToRead");

    // update project to return to shelf without back button, or give confirmation that it worked
    await page.getByRole("link", { name: "Close" }).click();

    await expect(page.url()).not.toContain("/search");
    await expect(bookLiterary).toContainText("wantToRead");
  });
});
