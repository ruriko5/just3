import { test, expect } from "@playwright/test";

test.describe("Todo management feature", () => {
  test.describe("Add todo", () => {
    test("add new todo", async ({ page }) => {
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
    });
  });
  test("delete todo", async ({ page }) => {
    await page.goto("/todos");
    await expect(page).toHaveTitle(/Todos/);

    await page
      .getByRole("textbox", { name: "Title" })
      .fill("praywright test title");
    await page
      .getByRole("textbox", { name: "Description" })
      .fill("praywright test desc");

    await page.getByRole("button", { name: "Submit" }).click();

    await page.getByRole("button", { name: "Delete Todo" }).click();
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page.getByText("Todo has been deleted")).toBeVisible();
  });
  test("update todo", async ({ page }) => {
    await page.goto("/todos");
    await expect(page).toHaveTitle(/Todos/);

    await page
      .getByRole("textbox", { name: "Title" })
      .fill("praywright test title");
    await page
      .getByRole("textbox", { name: "Description" })
      .fill("praywright test desc");

    await page.getByRole("button", { name: "Submit" }).click();

    await page.getByRole("button", { name: "Edit Todo" }).click();

    await page
      .getByRole("textbox", { name: "Title" })
      .fill("praywright test title updated");

    await page.getByRole("button", { name: "Save changes" }).click();

    await expect(page.getByText("Todo has been updated")).toBeVisible();
    await expect(page.getByText("praywright test title updated")).toBeVisible();
  });
  test("migrate todo", async ({ page }) => {
    await page.goto("/todos");
    await expect(page).toHaveTitle(/Todos/);

    await page
      .getByRole("textbox", { name: "Title" })
      .fill("praywright test title");
    await page
      .getByRole("textbox", { name: "Description" })
      .fill("praywright test desc");

    await page.getByRole("button", { name: "Submit" }).click();

    await page.getByRole("button", { name: "Migrate to Done" }).click();
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page.getByText("Successfully")).toBeVisible();
    await page.getByRole("button", { name: "Link to done" }).click();

    await page.waitForURL("/dones");
    await expect(page).toHaveTitle(/Dones/);

    await expect(
      page.getByRole("heading", { name: "Dones Page" })
    ).toBeVisible();
    // await expect(page.getByText("praywright test title")).toBeVisible();
  });
});
