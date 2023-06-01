const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { prisma } = require('../prisma/prisma-client');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Почта и пароль обязательны' });
  }

  const user = await prisma.user.findFirst({ where: email });

  const isPasswordCorrect =
    user && (await bcrypt.compare(password, user.password));
};

const register = async (req, res, next) => {
  res.send('register');
};

const current = async (req, res, next) => {
  res.send('current');
};

module.exports = { login, register, current };
