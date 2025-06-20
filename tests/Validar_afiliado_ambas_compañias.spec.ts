import { test, expect } from '@playwright/test';

test.setTimeout(60000); // extender tiempo por seguridad

test('Validar afiliado asociado a ambas compañías', async ({ page }) => {
  await page.goto('http://172.24.208.208:30129/login');
  await page.getByRole('textbox', { name: 'Usuario' }).fill('234');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('3234');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('Enter');

  await page.getByRole('button', { name: 'Solicitar Autorización' }).click();
  await page.getByRole('textbox', { name: 'Número de Afiliado' }).fill('2101296166600');
  await page.locator('svg').nth(2).click();
  await page.getByRole('button', { name: 'Cancelar' }).nth(1).click();
});