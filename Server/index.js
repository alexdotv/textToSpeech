const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Используем bodyParser для обработки данных из формы
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Используем cors middleware для обработки CORS
app.use(cors());

// Обрабатываем POST-запрос на путь '/submit'
app.post('/submit', (req, res) => {
  // Получаем данные из формы
  const { login, password } = req.body;

  // Выводим данные в консоль сервера
  console.log('Received form data:');
  console.log('Username:', login);
  console.log('Password:', password);

  // Отправляем ответ клиенту
  res.send('Данные успешно получены!');
});

// Запускаем сервер на указанном порту
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
