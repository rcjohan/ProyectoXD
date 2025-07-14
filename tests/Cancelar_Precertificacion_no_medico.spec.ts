import { test, expect } from '@playwright/test';

test('Cancelar Precertificacion No Medico', async ({ page }) => {

  // 1. Navegar el Login  
  await page.goto('http://172.24.208.208:30129/login');

  // 2. Iniciar sesion
  await page.getByRole('textbox', { name: 'Usuario' }).click();
  await page.getByRole('textbox', { name: 'Usuario' }).fill('111');
  await page.getByRole('textbox', { name: 'Usuario' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('3111');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('Enter');

  //3. Ir a la seccion de precertificaciones
  await page.getByRole('button', { name: 'Precertificaciones' }).click();
  await page.getByRole('button', { name: 'Cancelar Precertificación' }).click();

  //4. Buscar precertificacion
  await page.getByRole('textbox', { name: 'Número precertificación' }).click();
  await page.getByRole('textbox', { name: 'Número precertificación' }).fill('5462153 ');
  await page.getByRole('button', { name: 'Buscar' }).click();

  //5. Cancelar precertificacion
  await page.getByRole('button', { name: 'Cancelar' }).click();
  await page.getByRole('button', { name: 'De acuerdo' }).click();
  await page.waitForTimeout(5000);
  await expect(page.getByText('Precertificación Cancelada')).toBeVisible();
});