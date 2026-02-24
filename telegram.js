import axios from 'axios';
import dotenv from 'dotenv';

// Загружаем переменные из .env
dotenv.config();

const token = process.env.TELEGRAM_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

export async function sendNotification(message) {
  // Проверка на случай, если забыл прописать переменные в .env
  if (!token || !chatId) {
    console.error('❌ Ошибка: Токен или Chat ID не найдены в .env файле');
    return;
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  
  try {
    await axios.post(url, {
      chat_id: chatId,
      text: message,
    });
    console.log('✅ Уведомление отправлено в Telegram');
  } catch (error) {
    console.error('❌ Ошибка Telegram:', error.response?.data?.description || error.message);
  }
}