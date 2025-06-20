import { Page } from '@playwright/test';

export class AutorizacionPage {
  constructor(private page: Page) {}

  async abrirSolicitud() {
    await this.page.getByRole('button', { name: 'Solicitar Autorización' }).click();
  }

  async cancelarSolicitud() {
    await this.page.locator('svg').nth(2).click();
    await this.page.getByRole('button', { name: 'Cancelar' }).nth(1).click();
  }
}
