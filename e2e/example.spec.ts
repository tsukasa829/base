import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    // Next.js default title is usually "Create Next App" unless changed in layout/metadata
    // We can just check that the page loads without 404
    await expect(page).toHaveTitle(/Create Next App/);
});

test('get started link', async ({ page }) => {
    await page.goto('/');

    // Check for text present in the default Next.js page
    await expect(page.locator('body')).toContainText('To get started, edit');
});
