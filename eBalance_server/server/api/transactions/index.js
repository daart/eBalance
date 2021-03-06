import express from 'express';

import { createOne, deleteOne, getOne, getAll, updateOne } from './controller';

const router = express.Router();

router.route('/')
  .get(getAll)
  .post(createOne)

router.route('/:id')
  .get(getOne)
  .put(updateOne)
  .delete(deleteOne);

export default router;
