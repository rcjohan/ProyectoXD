import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('http://172.24.208.208:30129/login');
  }

  async login(usuario: string, contrasena: string) {
    await this.page.getByRole('textbox', { name: 'Usuario' }).fill(usuario);
    await this.page.getByRole('textbox', { name: 'Contraseña' }).fill(contrasena);
    await this.page.getByRole('textbox', { name: 'Contraseña' }).press('Enter');
  }
}
