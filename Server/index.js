const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const OpenAI = require('openai');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, History, sequelize } = require('./db');

const app = express();
const port = 3000;

const secretKey = 'your_secret_key';

const openai = new OpenAI({
  apiKey: 'sk-proj-bAQ8wQbA3TAirL0gYgTbT3BlbkFJTNbrwSH5YWUyES4N1vuc',
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send('Access denied');

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
};

app.post('/registration', async (req, res) => {
  const { email, login, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      login,
      password: hashedPassword,
      tokens: 10
    });

    const token = jwt.sign({ id: newUser.id }, secretKey, { expiresIn: '1h' });
    res.send({ message: 'Registration successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.post('/login', async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await User.findOne({ where: { login } });
    if (!user) {
      return res.status(400).send('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send('Incorrect password');
    }

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
    res.send({ message: 'Login successful', token, tokens: user.tokens });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


app.post('/api/read', authenticateToken, async (req, res) => {
  const { text, voice } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    if (!user || user.tokens <= 0) {
      return res.status(403).json({ error: 'Not enough tokens' });
    }
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: voice,
      input: text,
    });

    const filename = `audio-${uuidv4()}.mp3`;
    const filePath = path.resolve(__dirname, filename);
    const buffer = Buffer.from(await mp3.arrayBuffer());

    await fs.promises.writeFile(filePath, buffer);

    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
      }
      fs.unlinkSync(filePath);
    });

    await user.createHistory({ text, voice });
    user.tokens -= 1;
    await user.save();
  } catch (error) {
    console.error('Error generating audio file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/history', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const history = await user.getHistories();
    res.json({ history });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.send({
      id: user.id,
      email: user.email,
      login: user.login,
      tokens: user.tokens, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

sequelize.sync();
