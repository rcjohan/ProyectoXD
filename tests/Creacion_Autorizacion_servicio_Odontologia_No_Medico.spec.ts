import { test, expect } from '@playwright/test';
import oracledb from 'oracledb';

// Configuración de conexión a Oracle
async function obtenerAfiliadoAleatorio(): Promise<string> {
  const connection = await oracledb.getConnection({
    user: 'USR_consulta_QA',
    password: 'prueba01',
    connectString: 'ARSPRIMERA_QA.WORLD'
  });

  const result = await connection.execute(
    `SELECT NUM_PLA
     FROM (
         SELECT NUM_PLA
         FROM RECLAMACION
         WHERE ANO = 2025
           AND RECLAMANTE = 234
           AND ESTATUS = 122
         ORDER BY DBMS_RANDOM.VALUE
     )
     WHERE ROWNUM < 2`
  );

  await connection.close();

  const afiliado = result.rows?.[0]?.[0];
  if (!afiliado) throw new Error('No se encontró afiliado válido');

  return afiliado.toString();
}


// Playwright
test('Creacion Autorizacion servicio Odontologia No   Medico', async ({ page }) => {
  const numAfiliado = await obtenerAfiliadoAleatorio();

  await page.goto('http://172.24.208.208:30129/login');

  await page.getByRole('textbox', { name: 'Usuario' }).fill('638');
  await page.getByRole('textbox', { name: 'Usuario' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('3638');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('Enter');

  await page.getByRole('button', { name: 'Solicitar Autorización' }).click();

  await page.getByRole('textbox', { name: 'Número de Afiliado' }).fill(numAfiliado);
  await page.locator('svg').nth(2).click();

  await page.getByRole('textbox', { name: 'Teléfono' }).click();
  await page.getByRole('textbox', { name: 'Teléfono' }).fill('8096300147');

  await page.getByRole('combobox').nth(1).click();
  await page.getByRole('combobox').nth(1).selectOption('8'); // Emergencia

  // 👉 Diagnóstico: usar type para simular entrada real
  const input = page.getByPlaceholder('Diagnóstico');
  await input.click();
  await input.fill('');
  await input.type('dolor abdominal', { delay: 100 });

  // Esperar que se rendericen las opciones
  const lista = page.locator('ul.sc-eeDRCY li');
  await expect(lista.first()).toBeVisible({ timeout: 5000 });

  const opciones = await lista.all();

  // Mostrar por consola las opciones visibles (para depuración)
  const textos = await Promise.all(
    opciones.map(async (el) => await el.textContent())
  );
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

  // Fallback aleatorio si no se encontró la opción deseada
  if (!seleccionada && opciones.length > 0) {
    const random = opciones[Math.floor(Math.random() * opciones.length)];
    const texto = await random.textContent();
    await random.click();
    console.warn(`⚠️ Opción aleatoria seleccionada: ${texto}`);
  }

  // Lupa de procedimientos
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
await page.getByRole('textbox', { name: 'Código de procedimiento' }).click();
await page.getByRole('textbox', { name: 'Código de procedimiento' }).fill('4467');

await page.getByRole('button', { name: 'Agregar Procedimiento' }).click();

await page.getByRole('button',{name:'Enviar Reclamación'}).click();
// Esperar confirmación visual de éxito
const mensaje = page.locator('text=Autorización P94');
await expect(mensaje).toBeVisible({ timeout: 10000 });

// Opcional: extraer número de autorización
const texto = await mensaje.textContent();
console.log(`✅ Reclamación confirmada: ${texto}`);

// Cerrar el mensaje de éxito
await page.getByRole('button', { name: 'De acuerdo' }).click();


});