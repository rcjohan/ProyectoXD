import { test, expect } from '@playwright/test';

test('Creacion Autorizacion servicio Emergencia', async ({ page }) => {
  await page.goto('http://172.24.208.208:30129/login');

  await page.getByRole('textbox', { name: 'Usuario' }).click();
  await page.getByRole('textbox', { name: 'Usuario' }).fill('13333');
  await page.getByRole('textbox', { name: 'Usuario' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('13333');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('Enter');

  await page.getByRole('button', { name: 'Solicitar Autorización' }).click();

  await page.getByRole('textbox', { name: 'Número de Afiliado' }).click();
  await page.getByRole('textbox', { name: 'Número de Afiliado' }).fill('4401105162302');
  await page.locator('svg').nth(2).click();

  await page.getByRole('textbox', { name: 'Teléfono' }).click();
  await page.getByRole('textbox', { name: 'Teléfono' }).fill('8096300147');

  await page.getByRole('combobox').nth(1).click();
  await page.getByRole('combobox').nth(1).selectOption('1');

  // --- Diagnóstico con espera al dropdown ---
  await page.getByRole('textbox', { name: 'Diagnóstico' }).click();
  await page.getByRole('textbox', { name: 'Diagnóstico' }).fill('dolor');

  // Esperar a que el dropdown cargue la opción
  await page.waitForSelector('li:has-text("7890 - DOLOR ABDOMINAL")');
  await page.getByText('7890 - DOLOR ABDOMINAL').click();
// Hacer clic en la lupa de procedimientos
await page.locator('svg[data-icon="search"]').nth(1).click();

// Esperar que cargue la lista de procedimientos
const iconosProcedimientos = page.locator('svg[data-icon="file-add"]');
await expect(iconosProcedimientos.first()).toBeVisible();

// Obtener todos los íconos
const iconos = await iconosProcedimientos.all();
let agregado = false;

// Iterar aleatoriamente hasta que uno funcione
for (let i = 0; i < iconos.length; i++) {
  const randomIndex = Math.floor(Math.random() * iconos.length);
  const icono = iconos[randomIndex];

  await icono.click();

  // Esperar un momento por si aparece advertencia
  await page.waitForTimeout(1000);

  const advertencia = page.locator('text=El prestador no puede ofrecer esta cobertura');
  if (await advertencia.isVisible()) {
    // Cerrar el modal
    await page.getByRole('button', { name: 'De acuerdo' }).click();
    continue; // intenta con otro procedimiento
  }

  // Verifica si se agregó el procedimiento a la tabla
  const filas = page.locator('table >> tbody >> tr');
  if (await filas.first().isVisible()) {
    agregado = true;
    break;
  }
}

if (!agregado) {
  throw new Error('No se pudo agregar ningún procedimiento válido');
}

});
