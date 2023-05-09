import { test, expect } from '@playwright/test';

test.describe('Verified status notification email', () => {
    test('Verified status notification email', async ({ page }) => {
        await test.step('1. Go to my page', async () => {
            await page.goto('/my-page');

            const locatorName = page.locator('.p-heading.heading-main>.heading-wrapper>h2');
            await expect(locatorName).toContainText('Account & Profile');
        });

        await test.step('2. Check the status', async () => {
            const locatorName = page.locator('.notification-email-wrapper .headline-wrapper .verify-status-wrapper');
            await expect(locatorName).toContainText('Verified');

            const locatorForm = page.locator('.notification-email-wrapper .form');
            await expect(locatorForm).toContainText('Change');
        });

        await test.step('3. Open change modal', async () => {
            await page.getByRole('button', { name: 'Change', exact: true }).click();

            const locatorName = page.locator('.p-button-modal .modal-content .header .modal-header');
            await expect(locatorName).toContainText('Verify Notification Email');
        });

        await test.step('4. Change notification email', async () => {
            await page.locator('#newNotificationEmail').getByRole('textbox').click();
            await page.locator('#newNotificationEmail').getByRole('textbox').fill(process.env.CHANGE_NOTIFICATION_EMAIL as string);
            await page.getByRole('button', { name: 'Send Code' }).click();

            const locatorName = page.locator('.notification-email-modal-wrapper .modal-content-wrapper .sent-email-wrapper .contents-wrapper .email-wrapper');
            await expect(locatorName).toContainText(process.env.CHANGE_NOTIFICATION_EMAIL as string);
        });

        await test.step('5. Enter verification code', async () => {
            await page.locator('#verificationCode').getByRole('textbox').click();
            await page.locator('#verificationCode').getByRole('textbox').fill('123456');
            await page.getByRole('button', { name: 'Verify Now' }).click();

            const response = await page.waitForResponse(`${process.env.APIURL as string}/identity/user/confirm-email`);
            await expect(response.status()).toBe(400);
        });
    });
});
