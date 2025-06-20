import { test, expect } from '@playwright/test';

test('Precertificación Médico - Flujo completo', async ({ page }) => {
  // Navegar al login
  await page.goto('http://172.24.208.208:30129/login');

  // Iniciar sesión
  await page.getByRole('textbox', { name: 'Usuario' }).fill('1267');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('4267');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('Enter');

  // Ir a la sección de precertificaciones
  await page.getByRole('button', { name: 'Precertificaciones' }).click();
  await page.getByRole('button', { name: 'Confirmar Precertificación' }).click();

  // Buscar número de precertificación
  const numeroPrecert = '5462154';
  await page.getByRole('textbox', { name: 'Número precertificación' }).fill(numeroPrecert);
  await page.getByRole('button', { name: 'Buscar' }).click();

  // Autorizar precertificación
 await page.getByRole('button', { name: 'Autorizar' }).click();

  // (Opcional) Verificar que se muestre un mensaje de éxito
   await page.waitForTimeout(5000);
  await expect(page.getByText('Precertificación autorizada')).toBeVisible();
});
