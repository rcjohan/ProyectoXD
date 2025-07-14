import { test, expect } from '@playwright/test';

test('Búsqueda Avanzada Por Afiliado', async ({ page }) => {
  
  // Navegar al login
  await page.goto('http://172.24.208.208:30129/login');

  // Ingresar credenciales
  await page.getByRole('textbox', { name: 'Usuario' }).click();
  await page.getByRole('textbox', { name: 'Usuario' }).fill('111');
  await page.getByRole('textbox', { name: 'Usuario' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('3111');

  // Iniciar sesión
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

  // Ir a la Búsqueda Avanzada
  await page.getByRole('button', { name: 'Búsqueda Avanzada' }).click();

  // Ingresar criterios de búsqueda
  await page.getByPlaceholder('Fecha Desde').fill('2025-04-07');
  await page.getByRole('textbox', { name: 'No. Autorización o Afiliado' }).click();
  await page.getByRole('textbox', { name: 'No. Autorización o Afiliado' }).fill('1293503400');

  // Ejecutar búsqueda
  await page.getByRole('button', { name: 'Buscar' }).click();

  // Seleccionar resultado
  await page.getByRole('cell', { name: '1293503400' }).click();

 // Mostrarlo en consola
/*const detalleTd = page.locator('td:has-text ("Afiliado")').first();
await detalleTd.waitFor({ state: 'visible', timeout: 15000 }); // espera visible
const afiliado = await detalleTd.textContent();
console.log('Resultado final:', afiliado?.trim());*/

const tdResultado = await page.getByRole('cell', { name: '1293503400' });
const contenido = await tdResultado.textContent();
console.log('Afiliado', contenido?.trim());
});