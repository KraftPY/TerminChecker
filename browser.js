import { chromium } from "playwright";

class BrowserManager {
  constructor() {
    this.context = null;
    this.userDataDir = './my_bot_profile';
  }

  async getContext() {
    // Если контекст еще не создан или браузер был закрыт (например, вылетел)
    if (!this.context || !this.context.browser()?.isConnected()) {
      console.log("🌐 Создаю единый контекст браузера...");
      this.context = await chromium.launchPersistentContext(this.userDataDir, {
        headless: false, // Смена на true для фоновой работы
        args: ['--disable-blink-features=AutomationControlled'],
        locale: 'uk-UA',
        timezoneId: 'Europe/Berlin'
      });
    }
    return this.context;
  }

  // Метод для создания новой чистой вкладки
  async getNewPage() {
    const context = await this.getContext();
    return await context.newPage();
  }
}

export const browserManager = new BrowserManager();