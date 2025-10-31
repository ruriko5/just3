import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  await page.getByRole("button", { name: "Login as Anonymous" }).click();

  await page.waitForURL("http://localhost:3000/todos");
  await expect(page).toHaveTitle(/Todos/);

  await page.context().storageState({ path: authFile });
});
