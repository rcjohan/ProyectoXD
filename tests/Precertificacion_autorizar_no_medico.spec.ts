import { test, expect } from '@playwright/test';
import oracledb from 'oracledb';

// 🔧 Función que obtiene una precertificación aleatoria desde Oracle
async function ObtenerPrecertificacion(): Promise<string> {
  const connection = await oracledb.getConnection({
    user: 'USR_consulta_QA',
    password: 'prueba01',
    connectString: 'ARSPRIMERA_QA.WORLD'
  });

  const result = await connection.execute(
    `SELECT SECUENCIAL
     FROM (
       SELECT SECUENCIAL
       FROM PRE_CERTIFICACION
       WHERE ANO = 2025
         AND NO_MEDICO = 234
         AND ESTATUS = 734
       ORDER BY DBMS_RANDOM.VALUE
     )
     WHERE ROWNUM < 2`
  );

  await connection.close();

  const precertificacion = result.rows?.[0]?.[0];
  if (!precertificacion) throw new Error('No se encontró una precertificación válida');

  return precertificacion.toString();
}

// 🧪 Test Playwright
test('Precertificación No Médico - Flujo completo', async ({ page }) => {
  const numeroPrecert = await ObtenerPrecertificacion(); // ✅ Llamada válida dentro del test
  console.log(`Número de precertificación seleccionado: ${numeroPrecert}`);

  // Navegar al login
  await page.goto('http://172.24.208.208:30129/login');

  // Iniciar sesión
  await page.getByRole('textbox', { name: 'Usuario' }).fill('234');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('3234');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('Enter');

  // Ir a la sección de precertificaciones
  await page.getByRole('button', { name: 'Precertificaciones' }).click();
  await page.getByRole('button', { name: 'Confirmar Precertificación' }).click();

  // Buscar número de precertificación
  await page.getByRole('textbox', { name: 'Número precertificación' }).fill(numeroPrecert);
  await page.getByRole('button', { name: 'Buscar' }).click();

  await page.getByRole('button', {name:'Autorizar'}).click();
  await page.waitForTimeout(5000);
  await expect(page.getByText(/Precertificación .* confirmada con éxito!/)).toBeVisible();
});
