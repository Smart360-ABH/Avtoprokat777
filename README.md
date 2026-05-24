# Инструкция по запуску и миграции проекта "Автопрокат 777"

Этот проект был успешно мигрирован из Replit для работы на Render.com и локального редактирования в VS Code.

## 1. Локальный запуск (VS Code)

### Предварительные требования
- Установите [Node.js](https://nodejs.org/) (рекомендуется версия 20 или 22).
- Установите менеджер пакетов `pnpm`:
  ```powershell
  npm install -g pnpm
  ```

### Шаги по запуску
1. **Откройте папку проекта** в VS Code.
2. **Установите зависимости**:
   ```powershell
   pnpm install
   ```
3. **Настройте переменные окружения**:
   - Скопируйте файл `.env.example` и переименуйте его в `.env`.
   - Если у вас есть локальная база данных PostgreSQL, укажите её URL в `DATABASE_URL`.
4. **Соберите проект**:
   ```powershell
   pnpm run build
   ```
5. **Запустите проект**:
   ```powershell
   pnpm run start
   ```
6. **Откройте браузер**: перейдите по адресу [http://localhost:3000](http://localhost:3000).

---

## 2. GitHub (Загрузка проекта)

Чтобы сайт работал на Render, его нужно загрузить на GitHub.

1. **Инициализируйте репозиторий**:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit for migration to Render"
   ```
2. **Создайте новый репозиторий** на [github.com](https://github.com/new).
3. **Свяжите локальный проект с GitHub** (замените URL на ваш):
   ```powershell
   git remote add origin https://github.com/ВАШ_ЛОГИН/ВАШ_РЕПОЗИТОРИЙ.git
   git branch -M main
   git push -u origin main
   ```

---

## 3. Render.com (Деплой)

### Создание базы данных
1. Зайдите на [Render.com](https://dashboard.render.com/).
2. Нажмите **New** -> **PostgreSQL**.
3. Назовите базу `avtoprokat777-db`.
4. После создания скопируйте **Internal Database URL**.

### Создание веб-сервиса
1. Нажмите **New** -> **Web Service**.
2. Выберите ваш GitHub репозиторий.
3. Render автоматически определит настройки из файла `render.yaml`.
4. Если настройки не подтянулись автоматически:
   - **Build Command**: `pnpm run build`
   - **Start Command**: `pnpm run start`
   - **Runtime**: `Node`
5. В разделе **Environment Variables** добавьте:
   - `DATABASE_URL`: вставьте скопированный ранее URL.
   - `NODE_ENV`: `production`

---

## 4. Как обновлять проект в будущем

1. Внесите изменения в VS Code.
2. Сохраните и отправьте их на GitHub:
   ```powershell
   git add .
   git commit -m "Описание изменений"
   git push origin main
   ```
3. Render увидит новый пуш и **автоматически** обновит ваш сайт!

---

## Исправление ошибок

- Если проект не собирается, убедитесь, что вы запустили `pnpm install`.
- Если сайт выдает ошибку `"DATABASE_URL must be set"`, проверьте настройки Environment Variables в панели Render.
- Если вы видите белый экран, проверьте консоль браузера (F12) на наличие ошибок путей.
