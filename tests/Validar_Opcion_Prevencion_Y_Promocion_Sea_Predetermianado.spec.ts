import { test, expect } from '@playwright/test';

test('Validar Opcion Promoción y Prevención sea Predeterminada', async ({ page }) => {
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

  // Entrar a módulo Promoción y Prevención
  await page.getByRole('button', { name: 'Promoción y Prevención' }).click();

  // Ingresar número de afiliado
  await page.getByRole('textbox', { name: 'Número de Afiliado' }).click();
  await page.getByRole('textbox', { name: 'Número de Afiliado' }).fill('1131900401');
  await page.locator('svg').nth(2).click();
  
  // Validar que el tipo de servicio sea "Promoción y Prevención"
  const tipoServicioSelect = page.locator('select[disabled]');
  await expect(tipoServicioSelect).toHaveValue('6');

  const selectedText = await tipoServicioSelect.locator('option:checked').textContent();
  console.log('✅ Tipo de servicio seleccionado:', selectedText?.trim());
});