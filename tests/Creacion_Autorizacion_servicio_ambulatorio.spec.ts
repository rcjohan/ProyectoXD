import { test, expect } from '@playwright/test';

test('Flujo completo de reclamación médica', async ({ page }) => {
  // --- Login ---
  await page.goto('http://172.24.208.208:30129/login');
  const usuario = page.getByRole('textbox', { name: 'Usuario' });
  const contrasena = page.getByRole('textbox', { name: 'Contraseña' });

  await usuario.fill('111');
  await contrasena.fill('3111');
  await contrasena.press('Enter');

  // --- Solicitar autorización ---
  await page.getByRole('button', { name: 'Solicitar Autorización' }).click();

  // --- Afiliado ---
  const afiliado = page.getByRole('textbox', { name: 'Número de Afiliado' });
  await afiliado.fill('1101264584603');
  await page.locator('svg').nth(2).click();

  // --- Contacto ---
  const telefono = page.getByRole('textbox', { name: 'Teléfono' });
  await telefono.fill('(809) 909-6789');

  // --- Tipo de Servicio ---
  const tipoServicio = page.getByRole('combobox').nth(1);
  await tipoServicio.selectOption('1');

  // --- Diagnóstico ---
  const diagnostico = page.getByRole('textbox', { name: 'Diagnóstico' });
  await diagnostico.fill('dolor');
  const resultadoDiagnostico = page.locator('text="7890 - DOLOR ABDOMINAL"');
  await expect(resultadoDiagnostico).toBeVisible();
  await resultadoDiagnostico.click();

  // --- Procedimiento ---
  await page.getByRole('row', { name: 'search' }).locator('svg').click();
  await page.getByRole('row', { name: '1 ACIDO URICO EN ORINA DE 24' }).locator('svg').click();

  const codigoProcedimiento = page.getByRole('textbox', { name: 'Código de procedimiento' });
  await codigoProcedimiento.fill('111');
  await page.getByRole('button', { name: 'Agregar Procedimiento' }).click();

  // --- Enviar Reclamación ---
  await page.getByRole('button', { name: 'Enviar Reclamación' }).click();
  await page.getByRole('button', { name: 'De acuerdo' }).click();

  // --- Validación (opcional) ---
  // await expect(page.getByText(/reclamación enviada/i)).toBeVisible();
});