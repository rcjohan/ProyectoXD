import { test } from '@playwright/test';

test('Login de médico', async ({ page }) => {
  await page.goto('http://172.24.208.208:30129/login');
  await page.getByRole('textbox', { name: 'Usuario' }).fill('13333');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('13333');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('img', { name: 'logout' }).locator('svg').click();
});

