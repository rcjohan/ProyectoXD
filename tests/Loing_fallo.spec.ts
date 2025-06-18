import { test, expect } from '@playwright/test';

test('Login erroneo', async ({ page }) => {
  await page.goto('http://172.24.208.208:30129/login');
  await page.getByRole('textbox', { name: 'Usuario' }).fill('1234');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('1234');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('Enter');
  await page.getByRole('button', { name: 'De acuerdo' }).click();
});