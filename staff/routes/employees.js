const express = require('express');
const router = express.Router();

const {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  editEmployee,
} = require('../controllers/employees');

// /api/employees

/** получить всех сотрудников */
router.get('/all', getEmployees);

/** получить сотрудника по id */
router.get('/:id', getEmployee);

/** создать сотрудника */
router.post('/add', createEmployee);

/** удалить сотрудника по id */
router.delete('/remove/:id', deleteEmployee);

/** редактировать сотрудника по id */
router.put('/edit/:id', editEmployee);

module.exports = router;
