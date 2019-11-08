const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller.js');

router.post('/sign-up', authController.signUp);
router.post('/sign-in', authController.signIn);

router.get('/:id', authController.getUser);

module.exports = router;
