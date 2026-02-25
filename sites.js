export const sites = [
  {
    name: "Кёльн",
    url: "https://cologne.pasport.org.ua/",
    link: "https://cologne.pasport.org.ua/solutions/e-queue",
    // Вся специфика сайта теперь живет здесь
    checkLogic: async (page) => {
      await page.click('text="Запис онлайн"');

      const errorText = "сервіс тимчасово недоступний";
      const noSlotsText = "Вибачте, на даний момент всі місця зайняті!";
      const successSignal = "Верифікація через Дію";

      try {
        await Promise.race([
          page.waitForSelector("select#service", { timeout: 25000 }),
          page.locator(`text=${errorText}`).waitFor({ timeout: 25000 }),
        ]);

        // Проверяем, появилась ли ошибка
        const errorVisible = await page
          .locator(`text=${errorText}`)
          .isVisible();
        if (errorVisible) {
          return { status: "error", message: errorText };
        }

        await page.selectOption("select#service", "4"); // ID для паспорта

        await Promise.race([
          page.locator(`text=${noSlotsText}`).waitFor({ timeout: 30000 }),
          page.locator(`text=${successSignal}`).waitFor({ timeout: 30000 }),
        ]);

        // 4. Проверяем результат
        if (await page.locator(`text=${noSlotsText}`).isVisible()) {
          return { status: "empty", message: noSlotsText };
        }

        if (await page.locator(`text=${successSignal}`).isVisible()) {
          return { status: "found", message: "🔥 ЕСТЬ МЕСТА!" };
        }

        return { status: "unknown", message: "Неизвестный результат" };
      } catch (error) {
        if (error.name === "TimeoutError") {
          return { status: "error", message: "Сайт не отвечает (таймаут)" };
        }
        return {
          status: "error",
          message: `Ошибка проверки: ${error.message}`,
        };
      }
    },
  },
  {
    name: "Мюнхен",
    url: "https://munich.pasport.org.ua/",
    link: "https://munich.pasport.org.ua/solutions/e-queue",
    // Вся специфика сайта теперь живет здесь
    checkLogic: async (page) => {
      await page.click('text="Запис онлайн"');

      const errorText = "сервіс тимчасово недоступний";
      const noSlotsText = "Вибачте, на даний момент всі місця зайняті!";
      const successSignal = "Верифікація через Дію";

      try {
        await Promise.race([
          page.waitForSelector("select#service", { timeout: 25000 }),
          page.locator(`text=${errorText}`).waitFor({ timeout: 25000 }),
        ]);

        // Проверяем, появилась ли ошибка
        const errorVisible = await page
          .locator(`text=${errorText}`)
          .isVisible();
        if (errorVisible) {
          return { status: "error", message: errorText };
        }

        await page.selectOption("select#service", "4"); // ID для паспорта

        await Promise.race([
          page.locator(`text=${noSlotsText}`).waitFor({ timeout: 30000 }),
          page.locator(`text=${successSignal}`).waitFor({ timeout: 30000 }),
        ]);

        // 4. Проверяем результат
        if (await page.locator(`text=${noSlotsText}`).isVisible()) {
          return { status: "empty", message: noSlotsText };
        }

        if (await page.locator(`text=${successSignal}`).isVisible()) {
          return { status: "found", message: "🔥 ЕСТЬ МЕСТА!" };
        }

        return { status: "unknown", message: "Неизвестный результат" };
      } catch (error) {
        if (error.name === "TimeoutError") {
          return { status: "error", message: "Сайт не отвечает (таймаут)" };
        }
        return {
          status: "error",
          message: `Ошибка проверки: ${error.message}`,
        };
      }
    },
  },
];
