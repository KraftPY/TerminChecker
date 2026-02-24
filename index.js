import cron from 'node-cron';
import { sites } from "./sites.js";
import { runCheck } from "./checker.js";

async function performTask() {
  console.log(`\n--- [${new Date().toLocaleTimeString()}] Запуск плановой проверки ---`);
  
  for (const site of sites) {
    try {
      await runCheck(site);
    } catch (err) {
      console.error(`Критический сбой при проверке ${site.name}:`, err.message);
    }
  }
  
  console.log(`--- [${new Date().toLocaleTimeString()}] Проверка завершена. Жду следующего цикла... ---`);
}

// Настройка расписания: например, каждые 5 минут
// Формат: 'минуты часы день месяц день_недели'
cron.schedule('*/5 * * * *', () => {
  performTask();
});

// Запускаем первый раз сразу при старте скрипта
performTask();

console.log("🚀 Планировщик запущен (каждые 5 минут). Нажми Ctrl+C для выхода.");