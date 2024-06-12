// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('./db');

const app = express();
const port = 3000;

const secretKey = 'your_secret_key';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.post('/registration', async (req, res) => {
  const { email, login, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      login,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser.id }, secretKey, { expiresIn: '1h' });
    res.send({ message: 'Регистрация прошла успешно', token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка сервера');
  }
});


app.post('/login', async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await User.findOne({ where: { login } });
    if (!user) {
      return res.status(400).send('Пользователь не найден');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send('Неверный пароль');
    }

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
    res.send({ message: 'Успешный вход', token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка сервера');
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
