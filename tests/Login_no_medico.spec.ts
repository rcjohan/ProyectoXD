import { test, expect } from '@playwright/test';

test('Login no medico', async ({ page }) => {
  await page.goto('http://172.24.208.208:30129/login');
  await page.getByRole('textbox', { name: 'Usuario' }).click();
  await page.getByRole('textbox', { name: 'Usuario' }).fill('234');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('3234');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('img', { name: 'logout' }).locator('svg').click();
});
