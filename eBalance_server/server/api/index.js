import express from 'express';

import protect from './protect';
import auth from './auth';
import users from './users';

const router = express.Router();

router.use('/auth', auth);
router.use('/users', protect, users);

export default router;
