import express from 'express';

import protectedRoute from './../utils/middleware/protectedRoute';
import auth from './auth';
import users from './users';
import accounts from './accounts';
import categories from './categories';

const router = express.Router();

router.use('/auth', auth);
router.use('/users', protectedRoute, users);
router.use('/accounts', protectedRoute, accounts);
router.use('/categories', protectedRoute, categories);

export default router;
