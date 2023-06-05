const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { prisma } = require('../prisma/prisma-client');

const secret = process.env.JWT_SECRET || 'secret'; // секрет для токена

/** получение сотрудников */
const getEmployees = async (req, res, next) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Получение сотрудников: ${error}` });
  }
};

/** получение сотрудника по id */
const getEmployee = async (req, res, next) => {
  const { id } = req.params;
  try {
    res.status(200).json(id);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Получение сотрудника по id: ${error}` });
  }
};

/** создание сотрудника */
const createEmployee = async (req, res, next) => {
  try {
    const { firstName, lastName, age, address } = req.body;
    const { id } = req.user;

    if (!firstName || !lastName || !age || !address) {
      return res.status(400).json({ message: `Все поля обязательны` });
    }
    if (!req.user) {
      return res
        .status(401)
        .json({ message: `Необходима авторизация createEmployee` });
    }
    // 1) update user; 2) create employee
    // const employee = await prisma.user.update({where: { id: req.user.id }, data: {employees: { create: { firstName, lastName, age: age / 1, address } },},});
    const employee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        age: age / 1,
        address,
        author: {
          connect: { id },
        },
      },
    });
    res.json(employee);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

/** удаление сотрудника */
const deleteEmployee = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Удаление сотрудника по id: ${error}` });
  }
};

/** редактирование сотрудника */
const editEmployee = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: `Редактирование сотрудника по id: ${error}` });
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  editEmployee,
};
