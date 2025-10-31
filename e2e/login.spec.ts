import { test, expect } from "@playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("login feature", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("login page", async ({ page }) => {
    await expect(page).toHaveTitle(/Login/);

    await expect(page.getByText("Welcome back")).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Login with Google" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Login with GitHub" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Login as Anonymous" })
    ).toBeVisible();
  });

  test("login", async ({ page }) => {
    await page.getByRole("button", { name: "Login as Anonymous" }).click();

    await page.waitForURL("/todos");

    await expect(page).toHaveTitle(/Todos/);

    await expect(
      page.getByRole("heading", { name: "Todos Page" })
    ).toBeVisible();

    await page.goto("/login");
    await page.waitForURL("/todos");
    await expect(page).toHaveTitle(/Todos/);
  });
});
