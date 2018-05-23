import express from 'express';

import { deleteUser, getAllUsers } from './controller';

const router = express.Router();

router.use('/all', getAllUsers);
router.use('/:id', deleteUser);

export default router;
