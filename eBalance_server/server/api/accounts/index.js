import express from 'express';

import { createOne, getAll, getOne, deleteOne, updateOne } from './controller';

const router = express.Router();

router.route('/')
  .get(getAll)
  .post(createOne);

router.route('/:id')
  .get(getOne)
  .patch(updateOne)
  .delete(deleteOne);

export default router;