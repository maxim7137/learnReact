const jwt = require('jsonwebtoken');
const { prisma } = require('../prisma/prisma-client');
const secret = process.env.JWT_SECRET || 'secret'; // секрет для токена

/** авторизация */
const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(' ')[1]; // получаем токен из запроса, если он есть знак ?
    const { id } = jwt.verify(token, secret); // достаем id из токена
    // находим пользователя в базе данных по id из пришедшего токена
    const user = await prisma.user.findUnique({ where: { id } });
    // обогащаем запрос пользователем
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: `Необходима авторизация: ${error}` });
  }
};

module.exports = { auth };
