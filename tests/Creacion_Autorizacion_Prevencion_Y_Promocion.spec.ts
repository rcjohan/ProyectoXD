import { test, expect } from '@playwright/test';

test('Crear y enviar reclamación de promoción y prevención', async ({ page }) => {
  //  Login
  await page.goto('http://172.24.208.208:30129/login');
  await page.getByRole('textbox', { name: 'Usuario' }).fill('1100');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('4100');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

  //  Acceder a módulo Promoción y Prevención
  await page.getByRole('button', { name: 'Promoción y Prevención' }).click();

  //  Buscar afiliado
  await page.getByRole('textbox', { name: 'Número de Afiliado' }).fill('1131900401');
  await page.locator('svg').nth(2).click();

  //  Ingresar teléfono
  await page.getByRole('textbox', { name: 'Teléfono' }).fill('(829) 218-4856');

  //  Ingresar diagnóstico
  // Diagnóstico
  const input = page.getByPlaceholder('Diagnóstico');
  await input.click();
  await input.fill('');
  await input.type('dolor abdominal', { delay: 100 });
 
  const lista = page.locator('ul.sc-eeDRCY li');
  await expect(lista.first()).toBeVisible({ timeout: 5000 });
 
  const opciones = await lista.all();
  const textos = await Promise.all(opciones.map(async (el) => await el.textContent()));
  console.log('📋 Opciones encontradas:', textos);
 
  let seleccionada = false;
 
  for (const opcion of opciones) {
    const texto = await opcion.textContent();
    if (texto?.toUpperCase().includes('7890 - DOLOR ABDOMINAL')) {
      await opcion.click();
      console.log(`✅ Opción seleccionada: ${texto}`);
      seleccionada = true;
      break;
    }
  }
 
  if (!seleccionada && opciones.length > 0) {
    const random = opciones[Math.floor(Math.random() * opciones.length)];
    const texto = await random.textContent();
    await random.click();
    console.warn(`⚠️ Opción aleatoria seleccionada: ${texto}`);
  }
 

  //  Ingresar código de procedimiento
  await page.locator('svg[data-icon="search"]').nth(1).click();
 
  const iconosProcedimientos = page.locator('svg[data-icon="file-add"]');
  await expect(iconosProcedimientos.first()).toBeVisible();
 
  const iconos = await iconosProcedimientos.all();
  let agregado = false;
 
  for (let i = 0; i < iconos.length; i++) {
    const randomIndex = Math.floor(Math.random() * iconos.length);
    const icono = iconos[randomIndex];
 
    await icono.click();
    await page.waitForTimeout(1000);
 
    const advertencia = page.locator('text=El prestador no puede ofrecer esta cobertura');
    if (await advertencia.isVisible()) {
      await page.getByRole('button', { name: 'De acuerdo' }).click();
      continue;
    }
 
    const filas = page.locator('table >> tbody >> tr');
    if (await filas.first().isVisible()) {
      agregado = true;
      break;
    }
  }
 
  if (!agregado) {
    throw new Error('No se pudo agregar ningún procedimiento válido');
  }

  //  Enviar reclamación
  await page.getByRole('button', { name: 'Enviar Reclamación' }).click();
 
 //  Confirmar autorización
 const autorizacion = await page.getByText(/^¡Autorización/).textContent();
 console.log('✅ Reclamación enviada con:', autorizacion?.trim());


 });