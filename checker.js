import { browserManager } from "./browser.js";
import { sendNotification } from "./telegram.js";

export async function runCheck(site) {
  const page = await browserManager.getNewPage();

  try {
    console.log(`🔎 Проверка: ${site.name}...`);
    await page.goto(site.url, { waitUntil: "domcontentloaded" });

    // Вызываем специфичную логику этого сайта
    const result = await site.checkLogic(page);

    if (result.status === "found" || result.status === "unknown") {
      await sendNotification(`[${site.name}] ${result.message} (${site.link})`);
    }
    console.log(`[${site.name}]: ${result.message}`);
  } catch (err) {
    console.error(`❌ Ошибка на сайте [${site.name}]:`, err.message);
  } finally {
    await page.close().catch(() => {});
  }
}
