import { chromium } from "playwright";

async function runInMyProfile() {
  const userDataDir = './my_bot_profile';

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args: ['--disable-blink-features=AutomationControlled'],
    viewport: { width: 1280, height: 720 },
    locale: 'uk-UA',
    timezoneId: 'Europe/Berlin'
  });

  const page = context.pages()[0] || await context.newPage();

  try {
    // 1. Заход на главную
    await page.goto("https://cologne.pasport.org.ua/");

    // 2. Клик на "Запис онлайн"
    await page.click('text="Запис онлайн"');

    // 3-6. Ожидание загрузки страницы очереди (и обход Cloudflare через профиль)
    const targetText = "Електронна черга за адресою Кельн";
    await page.waitForFunction((text) => document.body.innerText.includes(text), 
      targetText, 
      { timeout: 30000 }
    );
    console.log("Страница открыта");

    // 7. Выбор услуги (value="4")
    await page.waitForSelector('select#service');
    await page.selectOption('select#service', '4');

    // Ожидание обновления контента после выбора
    await page.waitForTimeout(3000); 

    // 8. Проверка наличия кнопки "Продовжити"
    const continueButton = await page.$('button:has-text("Продовжити")');

    if (continueButton) {
      console.log("Кнопка 'Продовжити' найдена!");
      // Здесь будет отправка в Telegram
    } else {
      // 9. Поиск сообщения об отсутствии мест
      const noSlotsText = "Вибачте, на даний момент всі місця зайняті!";
      const content = await page.innerText('body');

      if (content.includes(noSlotsText)) {
        console.log(noSlotsText);
      } else {
        console.log("Ни кнопки, ни текста об отсутствии мест не найдено.");
      }
    }

  } catch (err) {
    console.error("❌ Ошибка:", err.message);
  } finally {
    console.log("Завершение сессии...");
    await page.waitForTimeout(5000);
    await context.close();
  }
}

runInMyProfile();