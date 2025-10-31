import { test, expect } from "@playwright/test";

test.describe("Wanna management feature", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/wannas");
    await expect(page).toHaveTitle(/Wannas/);

    await page
      .getByRole("textbox", { name: "Title" })
      .fill("praywright test title");
    await page
      .getByRole("textbox", { name: "Description" })
      .fill("praywright test desc");

    await page.getByRole("button", { name: "Submit" }).click();
  });
  test("add wanna", async ({ page }) => {
    await expect(page.getByText("Wanna has been created")).toBeVisible();

    await expect(page.getByText("praywright test title")).toBeVisible();
  });
  test("delete wanna", async ({ page }) => {
    await page.getByRole("button", { name: "Delete Wanna" }).click();
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page.getByText("Wanna has been deleted")).toBeVisible();
  });
  test("update wanna", async ({ page }) => {
    await page.getByRole("button", { name: "Edit Wanna" }).click();

    await page
      .getByRole("textbox", { name: "Title" })
      .fill("praywright test title updated");

    await page.getByRole("button", { name: "Save changes" }).click();

    await expect(page.getByText("Wanna has been updated")).toBeVisible();
    await expect(page.getByText("praywright test title updated")).toBeVisible();
  });
  test("migrate wanna", async ({ page }) => {
    await page.getByRole("button", { name: "Migrate to Todo" }).click();
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page.getByText("Successfully")).toBeVisible();
    await page.getByRole("button", { name: "Link to todo" }).click();

    await page.waitForURL("/todos");
    await expect(page).toHaveTitle(/Todos/);

    await expect(
      page.getByRole("heading", { name: "Todos Page" })
    ).toBeVisible();
  });
});
