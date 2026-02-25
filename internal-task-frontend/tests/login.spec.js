import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should login with employee account', async ({ page }) => {
    // Go to login page
    await page.goto('http://localhost:5173/login');

    // Fill login form
    await page.fill('input[type="email"]', 'somchai@company.com');
    await page.fill('input[type="password"]', '123456');

    // Click login button
    await page.click('button[type="submit"]');

    // Should redirect to dashboard
    await expect(page).toHaveURL('http://localhost:5173/');

    // Check dashboard content
    await expect(page.locator('h1')).toContainText('แดชบอร์ด');
  });

  test('should login with manager account', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    await page.fill('input[type="email"]', 'somying@company.com');
    await page.fill('input[type="password"]', '123456');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('http://localhost:5173/');
    await expect(page.locator('h1')).toContainText('แดชบอร์ด');

    // Manager should see pending approvals alert
    const alert = page.locator('.bg-yellow-50');
    await expect(alert).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');

    await page.click('button[type="submit"]');

    // Should stay on login page
    await expect(page).toHaveURL('http://localhost:5173/login');
  });
});