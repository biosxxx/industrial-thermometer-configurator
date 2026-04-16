import { expect, test } from '@playwright/test';
import { getDevAppPath } from '../../config/dev-path';

const devAppPath = getDevAppPath();

test('configures a thermometer and exports PDF', async ({ page }) => {
  await page.goto(devAppPath);

  await page.getByRole('button', { name: /160 mm/i }).click();
  await page.getByRole('button', { name: /set custom/i }).first().click();
  await page.getByPlaceholder('Min').fill('0');
  await page.getByPlaceholder('Max').fill('200');

  await page.getByLabel(/tag number/i).fill('TI-1001');
  await page.getByLabel(/order number/i).fill('REF-001');
  await page.getByLabel(/customer/i).fill('Acme Plant');

  await page.getByRole('switch', { name: /thermowell/i }).click();
  await page.getByRole('button', { name: /adjustable/i }).click();

  await expect(page.getByText(/tag ti-1001/i)).toBeVisible();
  await expect(page.getByText(/thermowell tapered u 100 mm/i)).toBeVisible();
  await expect(page.getByText(/every-angle stem/i)).toBeVisible();

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: /download pdf/i }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe('Thermometer_Spec_REF-001.pdf');
});
