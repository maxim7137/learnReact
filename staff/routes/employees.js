const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth');
const {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  editEmployee,
} = require('../controllers/employees');

// /api/employees

/** получить всех сотрудников */
router.get('/all', auth, getEmployees);

/** получить сотрудника по id */
router.get('/:id', auth, getEmployee);

/** создать сотрудника */
router.post('/add', auth, createEmployee);

/** удалить сотрудника по id */
router.delete('/remove/:id', auth, deleteEmployee);

/** редактировать сотрудника по id */
router.put('/edit/:id', auth, editEmployee);

module.exports = router;
