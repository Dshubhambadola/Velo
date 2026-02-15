import { test, expect } from '@playwright/test';
import { loginOrRegister } from './utils';

test.describe('Wallet Features', () => {
    test.beforeEach(async ({ page }) => {
        await loginOrRegister(page, 'user@velo.finance', 'UserPass123!', 'Standard User');
        await page.goto('/wallets');
    });

    test('should display wallet balance and assets', async ({ page }) => {
        await expect(page.getByText('Total Net Worth')).toBeVisible();
        await expect(page.getByText('Active Networks')).toBeVisible();
    });

    test('should open deposit modal', async ({ page }) => {
        await page.click('text=Receive');
        await expect(page.getByText('Deposit Funds')).toBeVisible();
        await page.keyboard.press('Escape');
    });

    test('should open withdraw modal', async ({ page }) => {
        await page.click('text=Send Assets');
        await expect(page.getByText('Withdraw Funds')).toBeVisible();
        await page.keyboard.press('Escape');
    });
});
