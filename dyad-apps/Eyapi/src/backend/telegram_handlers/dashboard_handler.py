import asyncio
from telegram import Update
from telegram.ext import ContextTypes

from src.backend.config import logger, BASE_RETURN, FAN_SPEED_BASE, QUESTS
from src.backend.database import pool, get_user
# from src.backend.blockchain import w3, usd_token # Removed
from src.backend.metrics import request_duration

async def dashboard(update: Update, context: ContextTypes.DEFAULT_TYPE):
    with request_duration.time():
        user_id = update.callback_query.from_user.id if update.callback_query else update.message.from_user.id
        user = await get_user(user_id) # Removed w3, usd_token
        if not user:
            await (update.callback_query.message.reply_text if update.callback_query else update.message.reply_text)(
                "Ты не в игре! Вступи через /join 🤑"
            )
            return
        fan_speed = FAN_SPEED_BASE + user['power'] * 0.1 + user['fan_speed_bonus']
        return_rate = BASE_RETURN + user['power'] * 0.1 + user['return_boost']
        async with pool.acquire() as conn:
            quests_data = await conn.fetch('SELECT quest_id, progress FROM quests WHERE user_id = $1', user_id)
        quests_output = "\n".join([f"📜 {QUESTS[q['quest_id']]['task']}: Прогресс {q['progress']}/{2 if q['quest_id'] == 'invite_2' else 7 if q['quest_id'] == 'weekly_active' else 1}" for q in quests_data if q['quest_id'] in QUESTS])
        output = (
            f"📈 Дашборд {user['name']} 📈\n"
            f"Ранг: {user['rank']}\n"
            f"Вложения: {user['investment']:.2f} USDToken\n"
            f"Баланс: {user['gameBalances']:.2f} USDToken\n"
            f"Мощность: {user['power']:.2f} ⚡\n"
            f"Скорость вентилятора: {fan_speed:.2f}x\n"
            f"Доходность: {return_rate*100:.2f}%/неделя\n"
            f"Рефералы: {user['referrals']}\n"
            f"Достижения: {user['achievements'] or 'Нет'}\n"
            f"Квесты:\n{quests_output or 'Нет активных квестов'}\n"
            f"👉 Открой WebApp для графиков: https://example.com/dashboard/{user_id}" # Placeholder: Update with your actual deployed WebApp URL
        )
        await (update.callback_query.message.reply_text if update.callback_query else update.message.reply_text)(output)