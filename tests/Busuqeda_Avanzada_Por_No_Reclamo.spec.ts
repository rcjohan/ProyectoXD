import { test, expect } from '@playwright/test';

test('Busqueda Avanzada Por No. de Reclamo', async ({ page }) => {
  // Navegar al login  
  await page.goto('http://172.24.208.208:30129/login');

  // Ingresar credenciales
  await page.getByRole('textbox', { name: 'Usuario' }).click();
  await page.getByRole('textbox', { name: 'Usuario' }).fill('234');
  await page.getByRole('textbox', { name: 'Usuario' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('3234');

  // Iniciar sesión
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

  // Ir a la Búsqueda Avanzada
  await page.getByRole('button', { name: 'Búsqueda Avanzada' }).click();

  // Ingresar criterios de búsqueda
  await page.getByPlaceholder('Fecha Desde').fill('2025-04-07');
  await page.getByRole('textbox', { name: 'No. Autorización o Afiliado' }).click();
  await page.getByRole('textbox', { name: 'No. Autorización o Afiliado' }).fill('P94-2518251');

  // Ejecutar búsqueda
  await page.getByRole('button', { name: 'Buscar' }).click();

  // Seleccionar resultado
  await page.getByRole('cell', { name: 'P94-2518251' }).click();

  // Mostrarlo en consola
  const tdResultado = await page.getByRole('cell', { name: 'P94-2518251' });
  const contenido = await tdResultado.textContent();
  console.log('Numero de Autorizacion', contenido?.trim());
  });