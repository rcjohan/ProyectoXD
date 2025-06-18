import { Page } from '@playwright/test';

export class AfiliadoPage {
  constructor(private page: Page) {}

  async ingresarNumeroAfiliado(numero: string) {
    await this.page.getByRole('textbox', { name: 'Número de Afiliado' }).fill(numero);
  }
}
