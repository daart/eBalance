import express from 'express';

import { createOne, getAll, deleteOne, updateOne } from './controller';

const router = express.Router();

router.use('/create', createOne);
router.use('/:id', deleteOne);
router.use('/:id', updateOne);
router.use('/', getAll);

export default router;