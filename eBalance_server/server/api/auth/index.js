import express from 'express';

import { login, register, validateToken } from './controller';

const router = express.Router();

router.use('/login', login);
router.use('/register', register);
router.use('/validateToken', validateToken);

export default router;
