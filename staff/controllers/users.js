const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { prisma } = require('../prisma/prisma-client');

const secret = process.env.JWT_SECRET || 'secret'; // секрет для токена

/** вход */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body; // получаем почту и пароль из боди
    // если нет чего-то возвращаем и дальше код не обрабатываем
    if (!email || !password) {
      return res.status(400).json({ message: 'Почта и пароль обязательны' });
    }
    // если все введено получаем юзера из базы по почте
    const user = await prisma.user.findFirst({ where: { email } });
    // если пользователь есть сопоставляем введенный пароль с паролем пользователя из базы
    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));
    // если пользователь есть и пароли совпадают, отправляем ответ 200 объект с данными пользователя
    if (user && isPasswordCorrect) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '1d' }),
      });
      // иначе сообщаем что что-то не верно
    } else {
      res.status(400).json({ message: 'Неверный логин или пароль' });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: `Вход: ${error}` });
  }
};

/** регистрация */
const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body; // получаем почту, пароль и имя из боди
    // если что-то незаполнено возвращаем 400
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Заполните обязательные поля' });
    }
    // если все заполнено проверяем есть ли уже в базе такой пользователь, если есть возвращаем 400
    const registeredUser = await prisma.user.findFirst({ where: { email } });
    if (registeredUser) {
      return res
        .status(400)
        .json({ message: 'Такой пользователь уже существует' });
    }
    // если нет создаем пользователя, перед этим захешировав пароль
    const salt = await bcrypt.genSalt(); // соль для хеширования пароля
    const hashedPassword = await bcrypt.hash(password, salt); // хеш пароля

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '1d' }),
      });
    } else {
      return res
        .status(400)
        .json({ message: 'Не удалось создать пользователя' });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: `Регистрация: ${error}` });
  }
};

/** получаем текущего пользователя и отправляем его на фронт */
const current = async (req, res, next) => {
  try {
    const { password, ...rest } = req.user;
    return res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: `Получаем текущего пользователя: ${error}` });
  }
};

module.exports = { login, register, current };
