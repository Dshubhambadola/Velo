import { test, expect } from '@playwright/test';
import { loginOrRegister } from './utils';

test.describe('Team Management', () => {
    test.beforeEach(async ({ page }) => {
        await loginOrRegister(page, 'admin@velo.finance', 'AdminPass123!', 'Admin User');
        await page.goto('/employees');
    });

    test('should display team members list', async ({ page }) => {
        await expect(page.getByText('Personnel Directory')).toBeVisible();
        await expect(page.getByText('Onboard Member')).toBeVisible();
    });

    test('should navigate to invite page', async ({ page }) => {
        await page.click('text=Onboard Member');
        await expect(page).toHaveURL(/.*employees\/invite/);
        await expect(page.getByText('Invite Team Member')).toBeVisible();
    });

    test('should fill invitation form', async ({ page }) => {
        await page.goto('/employees/invite');
        await page.click('text=Single Invitation');
        await page.fill('input[type="email"]', 'newmember@velo.finance');
        await page.click('button:has-text("Continue")');
        // Expect next step or validation
    });
});
