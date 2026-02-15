import { test, expect } from '@playwright/test';
import { loginOrRegister } from './utils';

test.describe('Payroll Management', () => {
    test.beforeEach(async ({ page }) => {
        await loginOrRegister(page, 'admin@velo.finance', 'AdminPass123!', 'Admin User');
        await page.goto('/payroll');
    });

    test('should verify payroll page loads', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Payroll Batches' })).toBeVisible();
        await expect(page.getByText('New Batch')).toBeVisible();
    });

    test('should navigate to create batch page', async ({ page }) => {
        await page.click('text=New Batch');
        await expect(page).toHaveURL(/.*payroll\/new/);
        await expect(page.getByText('Create New Payroll Batch')).toBeVisible();
    });

    test('should allow manual entry navigation', async ({ page }) => {
        await page.goto('/payroll/new');
        await page.click('text=Manual Entry');
        await expect(page).toHaveURL(/.*payroll\/manual/);
    });
});
