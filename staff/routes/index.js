const router = require('express').Router();
const { auth } = require('../middleware/auth');

router.use('/api/user', require('./users'));
router.use('/api/employees', auth, require('./employees'));

router.use('/*', (req, res, next) => {
  try {
    throw new Error('Ресурс не найден. Проверьте URL и метод запроса');
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
