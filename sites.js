export const sites = [
  {
    name: "Кёльн",
    url: "https://cologne.pasport.org.ua/",
    link: "https://cologne.pasport.org.ua/solutions/e-queue",
    // Вся специфика сайта теперь живет здесь
    checkLogic: async (page) => {
      await page.click('text="Запис онлайн"');

      await page.waitForSelector("select#service", { timeout: 15000 });
      await page.selectOption("select#service", "4"); // ID для паспорта

      await page.waitForTimeout(10000);

      const noSlotsText = "Вибачте, на даний момент всі місця зайняті!";
      const successSignal = "Електронна черга за адресою";

      const content = await page.innerText("body");
      if (content.includes(noSlotsText)) {
        return { status: "empty", message: noSlotsText };
      } else if (content.includes(successSignal)) {
        return { status: "found", message: "🔥 ЕСТЬ МЕСТА!" };
      } else {
        return { status: "unknown", message: "Неизвестный результат проверки" };
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

      await page.waitForSelector("select#service", { timeout: 15000 });
      await page.selectOption("select#service", "4"); // ID для паспорта

      await page.waitForTimeout(10000);

      const noSlotsText = "Вибачте, на даний момент всі місця зайняті!";
      const successSignal = "Електронна черга за адресою";

      const content = await page.innerText("body");
      if (content.includes(noSlotsText)) {
        return { status: "empty", message: noSlotsText };
      } else if (content.includes(successSignal)) {
        return { status: "found", message: "🔥 ЕСТЬ МЕСТА!" };
      } else {
        return { status: "unknown", message: "Неизвестный результат проверки" };
      }
    },
  },
];
