import { test, expect } from '@playwright/test';

test('Validar Opcion Prevencion y Promoción', async ({ page }) => {
  // Navegar al login
  await page.goto('http://172.24.208.208:30129/login');

  // Ingresar usuario
  await page.getByRole('textbox', { name: 'Usuario' }).click();
  await page.getByRole('textbox', { name: 'Usuario' }).fill('1100');
  await page.getByRole('textbox', { name: 'Usuario' }).press('Tab');

  // Ingresar contraseña
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('4100');

  // Iniciar sesión
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

  // Navegar a la sección Promoción y Prevención
  await page.getByRole('button', { name: 'Promoción y Prevención' }).click();

  // Hacer clic en Agregar Reclamación Promoción
  await page.getByText('Agregar Reclamación Promoción').click();
});