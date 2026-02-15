import { Page, expect } from '@playwright/test';

export async function loginOrRegister(page: Page, email: string, password: string, name: string = 'Test User') {
    await page.goto('/login');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    try {
        // specific timeout to check if login succeeds quickly
        await expect(page).toHaveURL(/.*dashboard/, { timeout: 3000 });
        return; // Login successful
    } catch (e) {
        // Login failed, try to register
        console.log(`Login failed for ${email}, attempting registration...`);
    }

    // Register flow
    await page.goto('/register');
    await page.fill('input[name="fullName"]', name);
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    // Expect redirect to login
    await expect(page).toHaveURL(/.*login/);

    // Login again
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*dashboard/);
}
