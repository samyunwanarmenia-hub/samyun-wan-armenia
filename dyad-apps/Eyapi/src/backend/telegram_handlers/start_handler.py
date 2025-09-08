import asyncio
from datetime import datetime, timedelta

from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import ContextTypes

from src.backend.config import logger
from src.backend.metrics import request_duration
from src.backend.scheduled_tasks import event_active, event_end

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    with request_duration.time():
        keyboard = [
            [InlineKeyboardButton("Играть 🎮", web_app=WebAppInfo(url="https://example.com"))], # Placeholder: Update with your actual deployed WebApp URL
            [InlineKeyboardButton("Вступить 🤑", callback_data="join")],
            [InlineKeyboardButton("Купить мощность ⚡", callback_data="buy_power")],
            [InlineKeyboardButton("Статус 📊", callback_data="status")],
            [InlineKeyboardButton("Лидерборд 🥇", callback_data="leaderboard")],
            [InlineKeyboardButton("Ежедневный бонус 🎁", callback_data="daily")],
            [InlineKeyboardButton("Лотерея 🎰", callback_data="lottery")],
            [InlineKeyboardButton("Вывод 💸", callback_data="withdraw")],
            [InlineKeyboardButton("Админ 📊", callback_data="admin")],
            [InlineKeyboardButton("Дашборд 📈", callback_data="dashboard")],
            [InlineKeyboardButton("Голосование DAO 🗳️", callback_data="vote")]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        event_status = ""
        if event_active and event_end:
            time_left = (event_end - datetime.now()).total_seconds()
            if time_left > 0:
                event_status = f"\n⏰ Эксклюзивный ивент активен! До конца: {time_left / 3600:.1f} часов 🔥"
        
        await update.message.reply_text(
            f"🚀 Вступай в неоновую эру Пирамиды Богатства! 🌌\n"
            f"Крути вентилятор пассивного дохода с USDToken! ⚡️\n"
            f"Транзакции защищены смарт-контрактами на блокчейне 🛡️\n"
            f"Управляй системой через DAO! 🗳️\n"
            f"Команды:\n/join <имя> <сумма> [<реф_код>]\n/buy_power <кол-во>\n/status\n/leaderboard\n/daily\n/lottery\n/withdraw\n/admin\n/vote <процент>{event_status}",
            reply_markup=reply_markup
        )