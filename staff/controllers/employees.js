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
    res.status(401).json({ message: `Получение сотрудников: ${error}` });
  }
};

/** получение сотрудника по id */
const getEmployee = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: `Получение сотрудника по id: ${error}` });
  }
};

/** создание сотрудника */
const createEmployee = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: `Создание сотрудника по id: ${error}` });
  }
};

/** удаление сотрудника */
const deleteEmployee = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: `Удаление сотрудника по id: ${error}` });
  }
};

/** редактирование сотрудника */
const editEmployee = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    res
      .status(401)
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
