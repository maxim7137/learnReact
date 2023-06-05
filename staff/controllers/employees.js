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
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findFirst({
      where: { id },
    });
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: 'Такого сотрудника не существует' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Ошибка поиска сотрудника: ${error}` });
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
    res.status(201).json(employee);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

/** удаление сотрудника */
const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const deletedEmployee = await prisma.employee.findFirst({
      where: { id },
    });
    if (deletedEmployee.authorId === userId) {
      const employee = await prisma.employee.delete({
        where: { id },
      });
      res.status(200).json({ deleted: employee });
    } else {
      res
        .status(403)
        .json({ message: 'Нет прав доступа для удаления этого сотрудника' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Удаление сотрудника по id: ${error}` });
  }
};

/** редактирование сотрудника */
const editEmployee = async (req, res, next) => {
  try {
    const { firstName, lastName, age, address } = req.body;
    const { id } = req.params;
    const userId = req.user.id;
    const editedEmployee = await prisma.employee.findFirst({
      where: { id },
    });
    if (editedEmployee.authorId === userId) {
      const employee = await prisma.employee.update({
        where: { id },
        data: {
          firstName,
          lastName,
          age: age / 1,
          address,
          // author: { connect: { id: userId } },
        },
      });
      res.status(200).json({ edited: employee });
    } else {
      res.status(403).json({
        message: 'Нет прав доступа для редактирования этого сотрудника',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: `Редактирование сотрудника по id, возможно неверный id: ${error}`,
    });
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  editEmployee,
};
