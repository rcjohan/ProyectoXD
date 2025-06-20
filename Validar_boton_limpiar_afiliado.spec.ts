import { test, expect } from '@playwright/test';


test('Login y solicitud para eliminar datos del afiliado', async ({ page }) => {
 // 1. Navegar el login 
  await page.goto('http://172.24.208.208:30129/login');

 // 2. Iniciar sesion 
  await page.getByRole('textbox', { name: 'Usuario' }).click();
  await page.getByRole('textbox', { name: 'Usuario' }).fill('234');
  await page.getByRole('textbox', { name: 'Usuario' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('3234');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

// 3. Navegar a "Solicitar Autorizacion"

  await page.getByRole('button', { name: 'Solicitar Autorización' }).click();

// 4. Llenar numero de Afiliado
  await page.getByRole('textbox', { name: 'Número de Afiliado' }).click();
  await page.getByRole('textbox', { name: 'Número de Afiliado' }).fill('1131900401');
  await page.locator('svg').nth(2).click();

// 5. Eliminar datos y confirmar
  await page.getByRole('img', { name: 'delete' }).locator('svg').click();
  await page.getByRole('button', { name: 'De acuerdo' }).click();
});