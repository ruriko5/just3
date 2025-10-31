import { test, expect } from "@playwright/test";

test.describe("Done management feature", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/todos");
    await expect(page).toHaveTitle(/Todos/);

    await page
      .getByRole("textbox", { name: "Title" })
      .fill("praywright test title");
    await page
      .getByRole("textbox", { name: "Description" })
      .fill("praywright test desc");

    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByText("Todo has been created")).toBeVisible();

    await expect(page.getByText("praywright test title")).toBeVisible();

    await page.getByRole("button", { name: "Migrate to Done" }).click();
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page.getByText("Successfully")).toBeVisible();
    await page.getByRole("button", { name: "Link to done" }).click();

    await page.waitForURL("/dones");
    await expect(page).toHaveTitle(/Dones/);
    await expect(
      page.getByRole("heading", { name: "Dones Page" })
    ).toBeVisible();
  });
  test("delete done", async ({ page }) => {
    await page.getByRole("button", { name: "Delete Done" }).click();
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page.getByText("Done has been deleted")).toBeVisible();
  });
});
